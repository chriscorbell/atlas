---
title: "Immich"
phase: "Phase 18"
weight: 18
---

> **Prerequisite:** [Navidrome](/blueprint/17-navidrome)

If there is one app in the self-hosting world that makes people immediately understand why local ownership matters, it is **Immich**.

Immich gives you a Google Photos-like experience:

- mobile backup
- timelines and albums
- facial recognition and machine learning features
- sharing
- search

all while keeping the data under your control.

---

## Storage Planning Matters a Lot Here

Immich is not just "a folder of images with a web UI".

It uses:

- the original photo/video library
- a database
- cache and metadata
- generated thumbnails
- machine-learning side data

A practical approach is:

- store the primary photo library on the NAS
- keep the database and cache on the local SSD in the NixOS VM

That gives you a better balance of performance and capacity.

For example:

- library path on NAS: `/mnt/nas/photos/immich/library`
- appdata on VM: `~/docker/appdata/immich`

---

## Use the Official Compose File as Your Baseline

Immich moves quickly enough that I do **not** recommend freezing a full compose example in this guide and pretending it will stay correct forever.

Instead, start from Immich's official installation instructions and adapt the storage paths to your environment:

<a href="https://immich.app/docs/install/docker-compose" target="_blank" rel="noopener">https://immich.app/docs/install/docker-compose</a>

When adapting it, the important decisions are:

- point the main upload/library path at your NAS-backed photo storage
- keep PostgreSQL data on local SSD-backed appdata if possible
- keep Redis and other fast-changing app state local as well

---

## Suggested Local Layout

Create your local directories first:

```bash
mkdir -p ~/docker/appdata/immich
mkdir -p ~/docker/compose/photos
mkdir -p /mnt/nas/photos/immich/library
```

Then when you adapt the official compose file, keep the split clear:

- local VM storage for DB/cache
- NAS storage for the large library

---

## Mobile Backup Over Tailscale

This is the access model I recommend first.

1. Install the Immich mobile app on your phone
2. Install Tailscale on that phone
3. Connect it to your tailnet
4. Point the Immich app at your server's Tailscale hostname or address
5. Enable automatic backup

This gives you remote backup and access without having to expose Immich publicly on day one.

That is a very good trade.

---

## Capacity and Expectations

Photos and especially videos grow quickly.

If you enable automatic phone backup for multiple people, expect:

- storage consumption to rise fast
- thumbnail generation to take time
- machine-learning jobs to add CPU load

So do not judge the experience based only on the first ten minutes after initial import.

Large first-time indexing jobs are normal.

---

## Why This Belongs in a NAS-Centric Setup

Immich is one of the clearest examples of why bulk storage and application storage should be separated.

The media itself wants:

- lots of space
- reliable storage
- backup strategy

The application state wants:

- lower latency
- faster small-file access

That separation is exactly why putting the app host on one VM and the NAS on another is so useful.

---

## Next Steps

Next, we will look at automation beyond media with n8n.

Proceed to [n8n](/blueprint/19-n8n).

---

> **Last updated:** March 2026<br>
