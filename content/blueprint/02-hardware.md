---
title: "Hardware"
phase: "Phase 2"
weight: 2
---

This page helps you choose hardware based on what you plan to self-host.

## 1) Start by listing your services
Different services stress different resources:

### Light services (low CPU/RAM)
- NGINX, FileBrowser, small n8n workflows, basic Paperless usage

### Media services (CPU + storage; GPU/iGPU helps)
- Jellyfin (especially transcoding)
- *arr stack (Sonarr/Radarr/Lidarr)
- Immich (photo processing)

### Game servers (CPU + RAM)
- Minecraft servers (Crafty)

### Local LLMs (GPU + VRAM + fast disk)
- Ollama + OpenWebUI

## 2) Recommended baseline builds
Choose the closest match to your goals.

### A) Starter build (learning + a few services)
- CPU: 4–6 cores
- RAM: 16 GB
- Storage: 500 GB–1 TB SSD

### B) Media + automation build (most popular)
- CPU: 6–12 cores
- RAM: 32 GB (64 GB if you can)
- GPU: Intel iGPU (Quick Sync) **or** NVIDIA GPU for NVENC
- Storage: 1–2 TB NVMe + HDDs for media

### C) “All-in-one” build (this guide’s target)
You requested NAS + HA + Docker apps + media + LLMs + Minecraft on one machine.

**Recommended:**
- CPU: Intel 8th gen+ with iGPU (Quick Sync) *or* Ryzen + NVIDIA GPU
- RAM: **64 GB** (32 GB minimum if careful)
- NVMe: 1–2 TB (VMs + containers + databases)
- HDDs: 2–8 drives for ZFS pool
- Network: 1 GbE minimum; 2.5 GbE nice-to-have
- UPS: strongly recommended

## 3) Storage strategy (ZFS-friendly)
Plan storage with redundancy:
- 2 drives → mirror
- 3–5 drives → RAIDZ1
- 6+ drives → RAIDZ2

Avoid SMR drives for RAID/ZFS workloads when possible.

## 4) Single machine vs split storage/compute
### For this guide: single machine
We assume a desktop or old gaming PC so you can use:
- multiple internal drives
- an NVMe SSD
- optionally a GPU

### Optional: split storage + compute
- Machine A: TrueNAS SCALE with many HDDs
- Machine B: mini PC running Proxmox + Debian for compute

Pros: easier upgrades, clearer separation.
Cons: more hardware and power.

### Optional: rackmount
If you want hot-swap bays and server parts, a used rackmount build can be fun—just expect more noise and power draw.

## 5) Shopping list (practical)
- Desktop/old gaming PC
- 1–2 TB NVMe (Proxmox + VM disks + appdata)
- 2–6 HDDs (NAS pool)
- Optional NVIDIA GPU (LLMs / heavy transcoding)
- UPS

## Next
Proceed to: **[Installing Proxmox VE](02-proxmox-install.md)**


---
**Navigation:**   [Installing Proxmox VE (Bare Metal)](02-proxmox-install.md) →
