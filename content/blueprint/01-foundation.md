---
title: "Foundation"
phase: "Phase 1"
weight: 1
---

#### Why Build Your Own Personal Server?

Modern technology sacrifices ownership and agency for convenience.

Big Tech continues to force users into closed ecosystems that prioritize profit and control over user autonomy.

Things like expandable storage, local file management, and offline-first tools have steadily disappeared. In their place are mandatory clouds, subscriptions, and black-box systems you cannot inspect, control, or truly opt out of.

When your photos, documents, messages, and media only exist on someone else’s servers, they are no longer yours. You are merely allowed to access them under conditions that can change without notice.

This lack of ownership has real consequences: Automated moderation systems can misclassify private data. Accounts can be locked, deleted, or restricted without warning. Features you rely on can be removed or paywalled. And because the software is closed and proprietary, you have no way to know for certain what is happening behind the scenes, and you have no way to run the service yourself.

A simple rule applies:

> If you can’t inspect the software, it isn’t really yours.<br>
> If you can’t run the service yourself, you don’t truly control it.

#### What Self‑Hosting Does for You

Self‑hosting flips this relationship on its head.

Instead of trusting a remote company with your data, you run the services yourself, on hardware you own, in a place you control. Your photos stay local. Your documents aren’t scanned for training data or advertising. Your media library doesn’t disappear because of a licensing dispute or policy change.

Modern self‑hosted software can replace many familiar cloud services:

- Personal file storage instead of Google Drive or Dropbox
- Photo libraries with local AI instead of Google Photos or iCloud
- Streaming your own media libraries instead of Netflix or Spotify
- Private calendars, contacts, notes, and backups

These tools already exist, and many are excellent, but their adoption is limited because **the setup process feels intimidating.**

Users are often forced into a false choice: **either become an IT system administrator, or accept data extraction in exchange for convenience.**

**This guide exists to challenge that assumption.**

#### Why This Guide Starts with This Foundation

Building a personal server isn’t just about running one application. Once you control your own infrastructure, everything connects:

- Secure remote access
- Safe file transfers from your phone
- Network privacy and ad blocking
- Backups, updates, and resilience

Each layer builds on the one before it. That’s why this guide starts at the beginning and explains the why, not just the how.

**The goal is not to turn you into an expert overnight, the goal is to show you the path so you can walk it at your own pace.**

Self‑hosting can be a rabbit hole, but it’s one that leads toward ownership, resilience, and long‑term digital freedom. Once you understand the foundations, you can decide how far down that path you want to go.



- **Proxmox VE** as the bare-metal hypervisor
- **TrueNAS SCALE** VM as your NAS
- **Home Assistant OS** VM for smart home
- **Debian VM** as your Docker application host (Jellyfin, Immich, *arr stack, n8n, Ollama, etc.)

> **Last updated:** January 06, 2026

#### Who this is for
- You want to self-host services at home.
- You’re comfortable with basic PC building and following terminal commands.
- You want a setup that can evolve: start small, then add GPU acceleration, reverse proxy, backups, and monitoring.

#### What you’ll build
1. Pick hardware that matches your services (**GPU, RAM, storage, networking**)
2. Install Proxmox on bare metal
3. Run TrueNAS SCALE in a VM for ZFS-backed storage + SMB
4. Run Home Assistant OS in a VM with automated backups to NAS
5. Run Debian in a VM as your Docker host (optional GPU/iGPU passthrough)
6. Deploy Docker services (media, photos, automation, docs, web, etc.)
7. Secure remote access with Tailscale
8. Optional: domain + Cloudflare + Caddy reverse proxy
9. Optional: backup NAS + ZFS replication

#### Recommended reading order
Start here:
- [Hardware Selection & Recommendations](01-hardware.md)
- [Installing Proxmox VE (Bare Metal)](02-proxmox-install.md)
- [TrueNAS SCALE VM on Proxmox (ZFS + SMB)](03-truenas-vm.md)
- [Home Assistant OS VM on Proxmox (Backups to NAS)](04-haos-vm.md)
- [Debian VM on Proxmox (GPU/iGPU Passthrough + SSH)](05-debian-vm-gpu-ssh.md)

Then continue through the Docker apps as you need them.

#### Conventions used in examples
- Proxmox host: `pve`
- TrueNAS VM: `truenas`
- Home Assistant VM: `homeassistant`
- Debian VM: `debian-docker`
- ZFS pool: `tank`
- Mounts in Debian: `/mnt/nas/...`

#### Safety + responsibility notes
- Keep management UIs (Proxmox/TrueNAS) **off the public internet**.
- Use strong passwords and 2FA.
- Use torrents and file acquisition tools **legally and responsibly**.