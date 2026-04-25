---

title: "Homelabbing fun"
slug: "homelab"
date: "2026-1-29"
tags: ["homelab", "proxmox"]
description: "Every computer science student eventually starts two things: a personal website (where you are reading this) and a homelab. Obviously this means it is time to spend an unreasonable amount of money on the homelab."
--- 

# Homelab Projects — My Setup & Goals

My birthday was recently, and as a gift I got a BeeLink Mini PC, which finally gave me an excuse to start a proper homelab setup (or, if we are being honest, a tiny server sitting on my desk pretending to be infrastructure). I had been playing around with the idea for a while, but until recently I did not even have a desktop PC, so “services running 24/7” mostly meant leaving my laptop on and hoping for the best.

The BeeLink changed that. It is small, quiet, and only glows slightly more than the internet access point next to it, which means I can still sleep in the same room as it. This is an important design requirement because I am not emotionally prepared to listen to a rack server scream itself to death next to my bed.

The first real problem, of course, was power.

The extension cord with five plugs that I had was immediately not enough.

This led to the timeless engineering solution: extension cord into extension cord.

We are now at three free slots again, which means I have room for future bad decisions.

## BeeLink Mini PC — Proxmox & Workers

*Hardware:* BeeLink Mini PC SER5 Max

So the BeeLink now lives on my desk (after a brief side quest involving the post office refusing to let me have it) and runs Proxmox. Honestly, getting into virtualisation properly has been one of the more fun parts of this whole thing. Before this I mostly knew it conceptually, but actually setting up VMs, LXCs, networking, and trying not to accidentally lock myself out of everything is much better for learning.

My main goals were pretty simple: I wanted something stable, I wanted to be able to connect to it from outside through VPN, and I wanted some fun internal DNS routing so things like `nc.eikasia.net` would resolve to Nextcloud internally instead of me having to remember private IP addresses like some kind of animal.

Until now I had never really needed to set up proper networking, so this turned into a surprisingly educational experience. What I *did* know was how to use nginx and how to aggressively read documentation until a problem gives up (see a recently published blog on the shell).

The first thing I set up was an LXC container to act as the WireGuard host instance. Honestly, WireGuard itself is almost suspiciously easy to set up. You expose one random port, generate some keys, write a config that feels like it should not work, and suddenly you have a VPN that is faster and more stable than things people pay monthly subscriptions for. Dynamic DNS helps a lot here because having a host you can actually resolve turns out to be more useful than predicting your home IP by spiritual intuition.

At first I considered just throwing everything behind Tailscale and living in a happy world where things work immediately. That would have been responsible. Instead I decided that manually hosting my own VPN would be more fun, which is technically true if your definition of fun includes firewalls at uni breaking everything.

## Current Setup

### Worker 1 — Arch LXC

This is the “critical infrastructure running on the machine I trust the least” container.

Naturally, it runs Arch.

Is Arch the ideal server OS? Absolutely not. Is it the OS I am most comfortable with? Unfortunately yes. At some point convenience beats wisdom, and now my experimental system is also responsible for networking.

This worker currently handles:

- **nginx reverse proxy** for internally routing services
- **WireGuard host** which was the original reason for the entire setup
- **DNS server** so specific domains resolve internally to private IPs

The DNS part is honestly one of my favorite things. For example, `nc.eikasia.net` internally points to Nextcloud on the private network, while externally it points somewhere else entirely (well technically it points to the IP on my home wifi, please don't hack me I know `192.168.0.0/16` network is not secure). This is probably the biggest quality of life improvements I ever made. 

I also found a really nice nginx proxy manager which is about ten times easier than writing everything manually. I still had to do some custom nginx configuration because of course I did, but at least now I get to pretend I enjoy writing reverse proxy configs instead of admitting I just keep opening old ones and copying whatever worked last time. Who needs better software for proxying when you already have a random skill.

### Worker 2 — Ubuntu VM

This one is much less dramatic.

It runs **Nextcloud**, which is probably the most actually useful thing in the entire setup.

I mainly use it for syncing university files between my desktop at home and the laptop I carry around all day. It sounds like a small thing, but it genuinely made working so much easier since I switch between my laptop and desktop a lot throughout the day.

Honestly, even if I never hosted anything else on this machine, just having reliable file sync would already make the whole project worth it.

(Though obviously I am going to host more things because self-control is fake.)

## Future plans (and future mistakes)

Right now the setup is still pretty small, but that is mostly because I am trying very hard to pretend I am being reasonable. It already has the ability to do much more, and I fully intend to make worse decisions with it later.

Yes, I know about Jellyfin.

Everyone tells me about Jellyfin.

I know.

I will probably do it eventually.

For now I am mostly looking for fun/useful projects to throw onto it, especially things that make daily life easier or just feel unnecessarily cool to self-host. So if you have ideas, genuinely contact me.

And yes, I still have three free power sockets.

For now.
