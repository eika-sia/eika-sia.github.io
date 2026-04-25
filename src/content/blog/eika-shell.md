---
title: "Nightmares about Fortran70, abusing UNIX and other connected delusions"
slug: "eika-shell"
date: "2026-4-24"
tags: ["shell", "rant"]
description: "How hard could it be to write tab completion for a custom shell? Surely simple in C++"
---

## How this started?

I am taking an operating systems class, and one of the labs had a wonderfully innocent instruction: write a simple shell. The goal was mostly to work with things like `fork()`, `execvpe()`, process management... The required assignment itself was not even that bad. I got the “correct” version done in around 300 lines of code and technically that should have been the end of it.

Unfortunately, by that point I had already started building something that was actually fun.

I looked at those 300 lines, looked at the lab instructions saying the project was done, and immediately decided that clearly everyone involved was wrong. Surely this could not be the place to stop. So I kept going. The final submission ended up somewhere around 6000 lines of code, and as of writing this, with its singular user and primary victim (somehow not me), the shell sits at around 8500 lines.

Honestly, around 90% of that is just string parsing, weird state machines, strange data structures full of integers, and me discovering that terminals are held together entirely by backwards compatibility and bad decisions made in 1978. The other 10% is where I slowly start losing hair.

This post is mostly about three things: first, how hard tab completion could possibly be; second, whether everything being a file was actually a good idea; and third, why I no longer believe standards are real.

The actual project details will probably end up on the projects page once I finish rewriting other shell UX features. Until then, the code is on GitHub and the emotional damage is here.

## So how hard could tab completion really be?

Let us start from the end. This is what the feature is supposed to look like:

<video controls muted playsinline>
  <source src="/tab_completion.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

You press `Tab` once and get a list of completion candidates rendered below the prompt. You press `Tab` again and it selects the first candidate. You keep pressing `Tab` and it cycles through the options. Surely simple. Completely reasonable.

I already had the easy part done: a function that returns all valid completion candidates. That part is fine. It is just string matching and directory traversing. The real problem was rendering those candidates and making the terminal behave like it's supposed to.

I also discovered something mildly encouraging and deeply concerning: default `bash` and `zsh` do not actually implement the exact behavior I wanted. This was good news because maybe I was not being unreasonable, but also bad news because maybe there was a reason nobody wanted to do this.

Now yes, `<readline/readline.h>` exists. Yes, it already solves this. No, I did not use it, because that would have been sensible decision and we are here to be delusional about what exactly it means to do meaningful work.

The problem was not generating completion candidates, it was handling the rendering, cursor movement, prompt redraws, and making sure pressing `Tab` did not cause the shell to transform into abstract expressionism in order of elements. If there is only one candidate, life is easy. If there are two or more, suddenly you are writing a tiny UI framework inside your shell and pretending that was always the plan.

I wanted the first `Tab` press to display options below the prompt, the second to start selecting them, and then further presses to cycle through them. Surely simple behaviour. **Surely** I will not spend a week rewriting input and rendering. Surely output string is just `cout << something` right? Right??

## Is everything a file? Should everything be a file?

At some point I needed to know the size of the terminal window.

There are two ways to solve this. Option one is to lie to yourself and assume every terminal is 80 columns and 24 rows because that used to be true at one point in time and like it *would* work...

Option two is to ask the terminal politely.

This is where UNIX arrives to explain that everything is a file. If everything is a file, then your terminal (`tty`) is also a file, which means there must be some way to ask it for useful information. There is, and naturally the answer is `ioctl(2)`.

This would be nice and simple except for one very small issue: `ioctl()` is a non-standardised standard function.

What.

If you open `man 2 ioctl`, under the **Standards** section, it says:

> none

Excellent. Very reassuring. Exactly what you want from a foundational systems function in \**checks notes*\* standard c library.

Fine. Let us be more specific. `man 2 ioctl_tty`, the page specifically about terminal input/output devices, should surely help. Instead it politely informs me:

> Use of ioctl() makes for nonportable programs. Use the POSIX interface described in termios(3) whenever possible.

Fantastic. We love portable software. Let us look at `termios(3)`.

There is a lot of cool stuff there. You can manipulate terminal modes, disable input processing, break your backspace key, and generally make life worse in new and exciting ways. What you cannot do is get the size of the terminal window (`termios` will make a comeback later when we get to actually getting the tab pressed event).

There is, however, `tcgetwinsize()`, which appears in POSIX Issue 8. This would be great except my fully updated Arch machine does not compile code using it. Because while POSIX may declare something exists, `glibc` is under no legal obligation to care (and it doesn't).

So back to `ioctl()` we go.

Now we need the correct opcode, because `ioctl()` is not really a function so much as it is a scavenger hunt. Due to backwards compatibility from C99 to C90 to C89 to Fortran77 to Fortran70 to punch cards, these opcodes are compressed into cryptic names that look like a proper keysmash.

After some extra reading (and at this point already having read way to many man pages) we get to `TIOCGWINSZ`.

Of course that is what it is called.

This finally gives us a `struct winsize`, which contains rows and columns. Actual progress. I can finally format completion candidates into nice aligned columns like a real shell instead of dumping them into the space separated void and hoping for the best.

Then the manual adds one final beautiful sentence:

> Window sizes are kept in the kernel, but not used by the kernel.

Why.

Why is the kernel storing this information if it does not use it. Apparently just to have it. At this point I am convinced most of UNIX is powered entirely by backwards compatibility and fear. Also I assume this breaks on macOS (and possibly BSD, and honestly anything besides linux with kernel newer than 4.something) because `ioctl()` behaves differently there, but I do not own a Mac so this is now somebody else's problem.

## Standards are standardised to have standards right? We make standards not to have to care about this right?

The next problem was colors and keybindings, which sounds like it should be easy and therefore immediately became terrible.

Terminal behavior is controlled through ANSI escape sequences, except calling them just “ANSI codes” turns out to be one of those technically wrong simplifications that stops feeling harmless the moment you start reading documentation. The two things I cared about most here were `CSI` (Control Sequence Introducer) and `SS3`, because of course there are multiple systems for telling the terminal how to behave and of course they do not consistently agree.

At first I thought colors would be the hard part. They were not. Colors are easy. You define something like `const std::string blue`, concatenate it with your text and a reset code, and suddenly your shell looks alive with colour! Right now you cannot configure colors or prompt shapes in mine, but one day I will probably abstract that through shell variables and then immediately regret trying to support something like starship.

Input handling is where things became cursed.

To make proper keybindings work, I had to turn off a bunch of terminal settings and slowly crawl out of cooked mode toward raw mode input. This sounds harmless. What it actually means is that backspace stops working, because instead of deleting characters it now just sends `\b` and expects you to figure out the rest.

So in order to add one feature, I first had to completely destroy the input system and rebuild it from scratch.

Is this what systems programming is about?

I ended up implementing a lot of extra editor behavior mostly because I needed infrastructure for tab completion and also needed more test cases. So now the shell has things like an Emacs-style kill ring, which is especially funny because this is being written in Neovim (but for some reason terminal is defaulting to Emacs keybinds? I do not know why besides the fact that in `readline.h` which I gave up on that's the default, also vim keybinds for terminal behaviour sounds cursed).

I also had to support multiple escape sequences because not all terminals emit `CSI`; some decide they would rather use `SS3` just to keep things interesting. This means input handling is not really input handling, it is writing a parser for a tiny and extremely annoying language made entirely of escape codes.

Then comes state management. Since `Tab` behaves differently depending on whether completion mode is active, and arrow keys behave differently depending on prompt state, and rendering depends on cursor position, and the prompt itself is two lines instead of one because apparently I enjoy suffering, everything turns into a state machine.

The two-line prompt continues to be one of the worst bad decisions I have made. I have enough abstraction now that I could probably support a three line prompt. I say “probably” because emotionally I do not trust it enough to demonstrate that to another human being (for that matter a 1 line prompt shouldn't work either).

At some point during all of this I reached the final inevitable conclusion: I am done with standards. I am done reading standards, implementing standards, and discovering that standards are not actually standardized.

Why not just invent a new better standard?

Surely that has never gone wrong before.

![xkcd comic depicting conflicting character encoding standards](https://imgs.xkcd.com/comics/standards.png)

And of course there is an xkcd comic depicting my exact situation. 

Maybe computers were a mistake.
