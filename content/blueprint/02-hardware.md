---
title: "Hardware"
phase: "Phase 2"
weight: 2
---

Choosing your hardware based on what you plan to self-host is the first critical step.

This guide covers quite a bit of ground, but at the same time, it only really scratches the surface - there are a **ton** of self-hostable services out there that you can run, so don't feel like you have to do **everything here** all at once.

For example, if you just want to start out with setting up something like:
- Navidrome music server to replace Spotify
- FileBrowser for storing a few gigabytes of files to replace Google Drive
- Paperless-ngx for backing up important documents

Then you could technically get away with something as small and cheap as a [Raspberry Pi](https://www.amazon.com/dp/B0CK3L9WD3) with **4GB RAM** and a **128GB microSD card**, though it wouldn't necessarily be my first choice.

If you want to do a bit more with your server in addition to the above, like:
- Streaming your movies and TV libraries with Jellyfin
- Automate your music/movies/TV management with Sonarr/Radarr/Lidarr
- Automatically back up photos and videos from your phone using Immich
- Running a Minecraft server for you and your friends using Crafty

Then you would probably want to step up to something like [this mini PC](https://www.amazon.com/dp/B0D5QXTFHH) with a **4-core CPU** and **16GB RAM**, or maybe even [this mini PC](https://www.amazon.com/dp/B0DRFHXRKL) with an **8-core CPU** and **24GB RAM**.

If you want to run **everything** detailed in this guide and more, taking advantage of room for multiple hard drives for lots of storage capacity, and even adding a dedicated GPU to run local AI models offline, then you will likely want to build your own server or repurpose an old gaming PC.

Below is a quick-and-dirty separation of performance tiers based on workload:

**Low CPU/RAM:**
- NGINX web servers (for building and hosting your own websites)
- FileBrowser (Google Drive replacement)
- Paperless-ngx (document backup & organization)
- Navidrome (Spotify replacement)

**Decent CPU + RAM:**
- Crafty (running your own Minecraft server)
- n8n (workflow automation)

**Decent CPU with GPU/iGPU + plenty of storage:**
- Jellyfin (media streaming - Intel CPU + iGPU with QuickSync **OR** AMD CPU + separate NVIDIA GPU with NVENC recommended)
- Sonarr/Radarr/Lidarr (media library automation)
- Immich (Google Photos replacement)

**Fast CPU + Dedicated GPU with high VRAM + fast SSD:**
- Ollama + OpenWebUI (running local AI models)

### Recommended Baselines

##### A) Starter (experimenting with a few services):
- CPU: 4–8 cores
- RAM: 8GB
- Storage: 500GB – 1TB SSD

##### B) Media + Automation:
- CPU: 6–12 cores (Intel CPU + iGPU with QuickSync **OR** AMD CPU + separate NVIDIA GPU with NVENC)
- RAM: 16GB (32GB if you can)
- Storage: 500GB – 1TB NVMe + HDDs for media

##### C) The “Everything” Build:

- CPU: 8–16 cores
- GPU: NVIDIA RTX w/ high VRAM
- RAM: 32GB (64GB if you can)
- Storage: 1–2 TB NVMe (for VMs + containers + databases) + 2–8 HDDs for ZFS pool

### Storage Strategy
If you decide to build a server with multiple HDDs for large storage capacity, plan for redundancy:
- 2 drives → mirror
- 3–5 drives → RAIDZ1
- 6+ drives → RAIDZ2

**Avoid SMR hard drives**. Use CMR hard drives only.

*"RAIDZ? SMR? CMR? ZFS?"*

Don't worry - we will get into this later when we get to [TrueNAS](/blueprint/04-truenas).

### Single Machine vs Separate Storage & Compute
For this guide, we will only be considering the scenario of a single machine. We assume a desktop or old gaming PC so you can use:
- Multiple internal hard drives
- An NVMe SSD
- Optionally a GPU

**BUT** you could technically build two separate machines if you wanted:
- Machine A: Bare-metal TrueNAS SCALE with multiple HDDs
- Machine B: Mini PC running Proxmox + Debian for compute

Pros: easier upgrades, redundancy and separation<br>
Cons: more hardware and power, more complex to set up

### Rackmount
If you want hot-swap hard drive bays and actual enterprise server components, used rackmount servers can be found on eBay for attractive prices, but **expect more noise and higher power consumption.**