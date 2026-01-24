---
title: "Hardware"
phase: "Phase 2"
weight: 2
---

> **Prerequisite:** [Foundation](/blueprint/01-foundation)

## Consider Your Workload

Choosing the appropriate hardware based on what software you plan to self-host is the first critical step in your self-hosting journey.

This guide covers quite a bit of ground, but at the same time, it also only just scratches the surface - there are a **ton** of self-hostable services out there that you can run, so don't feel like you have to do **everything** listed here all at once.

For example: if you just want to run a handful of services but don't need terabytes of storage space and don't want to run local AI models, you can go for something like <a href="https://www.amazon.com/dp/B0D5QXTFHH" target="_blank" rel="noopener">this mini PC</a> with a **4-core CPU** and **16GB RAM**, or maybe even step up to <a href="https://www.amazon.com/dp/B0DRFHXRKL" target="_blank" rel="noopener">this mini PC</a> with an **8-core CPU** and **24GB RAM**.

But if you **do** want to run **everything** listed in this guide (and more), along with having tens of terabytes of resilient storage, you’ll likely want to do something like repurpose a full size desktop PC as a server so that you can take advantage of multiple 3.5" SATA hard drives for large storage capacity, along with full size PCIe slots for a SATA expansion card and/or a dedicated GPU.

---

## Recommended Baselines

Below is a quick-and-dirty separation of performance tiers based on workload:

### Starter
Works well for running multiple lightweight services with low concurrent usage (personal file storage, note-taking apps):
- CPU: 4-8 cores
- RAM: 8GB (16GB if you can)
- Storage: 500GB - 1TB SSD

### Midrange
Good for running a wider variety of services with moderate concurrent usage (media streaming, automated library management):
- CPU: 6-12 cores + integrated GPU
- RAM: 16GB (32GB if you can)
- Storage: 500GB - 1TB NVMe SSD + one or two HDDs for media/large file storage

### Pro
For running many services with higher concurrent usage, local AI models, and large storage needs:
- CPU: 8-16 cores
- GPU: Integrated **OR** dedicated (NVIDIA RTX w/ high VRAM if you want to run local AI models)
- RAM: 32GB (64GB if you can)
- Storage: 1 - 2 TB NVMe SSD + 2-8 HDDs for redundancy

> For the purposes of our guide, we will assume the **Pro** scenario so that we can cover all the bases, but if you’re using a mini PC or a smaller build, you can skip or adapt the steps that don’t apply. I’ll note those cases throughout.

---

## Bulk Storage Strategy
If your server will have multiple large hard drives (not SSDs), plan your storage pool with redundancy in mind:
- 2 hard drives → ZFS mirror
- 3-5 hard drives → RAIDZ1
- 6+ hard drives → RAIDZ2

*"Pool? ZFS? RAIDZ?"* - Don't worry, we will dive more into this when we get around to setting up TrueNAS later on. Just be aware that a smaller pool of large-capacity drives will be slower and less resilient than a larger pool of smaller-capacity drives, but if you can only start with a 2-drive mirror, that's still okay.

Also, **avoid SMR (Shingled Magnetic Recording) hard drives**. Use CMR (Conventional Magnetic Recording) hard drives instead, and ensure they are 7200RPM (not 5400RPM) 3.5" SATA hard drives, ideally rated for NAS scenarios. I personally recommend Seagate's <a href="https://www.amazon.com/dp/B0B94M13NH" target="_blank" rel="noopener">IronWolf Pro</a> NAS drives.

CMR uses separate tracks for faster, reliable writes (ideal for your NAS), while SMR overlaps tracks like shingles to increase capacity but has a **massive** negative impact on speed and latency.

## Rackmount/Enterprise
If you want to go crazy and build something with hot-swap hard drive bays and actual enterprise-grade server components, you can find used rackmount/tower servers on eBay for attractive prices, but **expect more noise and higher power consumption.**

> **BEWARE:** Owning a rack comes with risks to your wallet - if you have empty space in your rack, **you will find yourself browsing eBay at 3:00am looking for more hardware to fill it.**

---

> **Last updated:** January 2026<br>