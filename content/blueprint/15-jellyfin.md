---
title: "Jellyfin"
phase: "Phase 15"
weight: 15
---

> **Prerequisite:** [Movies/TV](/blueprint/14-movies-tv)

Once your media can be acquired and organized automatically, you need a way to actually watch it.

That is where **Jellyfin** comes in.

Jellyfin is a free and open-source media server that can stream your movies, TV and music to web browsers, phones, TVs and dedicated client apps.

For many people, this is the moment the whole stack stops feeling theoretical.

---

## Prepare the Media Paths

You should already have most of these from the previous sections:

- `/mnt/nas/media/movies`
- `/mnt/nas/media/tv`
- `/mnt/nas/media/music`

Now create local appdata for Jellyfin:

```bash
mkdir -p ~/docker/appdata/jellyfin
mkdir -p ~/docker/compose/media
```

---

## Create the Compose File

Create `~/docker/compose/media/jellyfin.compose.yml`:

```yaml
services:
  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /home/<your-user>/docker/appdata/jellyfin:/config
      - /mnt/nas/media/movies:/data/movies
      - /mnt/nas/media/tv:/data/tv
      - /mnt/nas/media/music:/data/music
    ports:
      - "8096:8096"
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start it:

```bash
docker compose -f ~/docker/compose/media/jellyfin.compose.yml up -d
```

Open:

```text
http://<nixos-ip>:8096
```

---

## Initial Setup

During first-run setup:

- create your admin account
- add your libraries
- point each library at the correct container path

For example:

- Movies library -> `/data/movies`
- TV library -> `/data/tv`
- Music library -> `/data/music`

Let Jellyfin scan the libraries completely before judging performance or metadata quality.

---

## Hardware Acceleration

Jellyfin can run entirely in software, but transcoding gets expensive fast.

If you want smoother remote playback and lower CPU load, hardware acceleration is worth it.

### Intel iGPU

If your NixOS VM has access to an Intel iGPU device, you would typically pass `/dev/dri` into the container:

```yaml
    devices:
      - /dev/dri:/dev/dri
```

Then enable the appropriate hardware acceleration option inside Jellyfin's playback settings.

### NVIDIA GPU

If you passed through an NVIDIA GPU to the NixOS VM, you will need the host OS configured for NVIDIA container support before the container can use it properly.

On NixOS, that generally means enabling Docker plus the NVIDIA container toolkit in your system configuration.

Because GPU setup varies quite a bit by hardware, treat this as an advanced follow-up task rather than a requirement for first launch.

> **NOTE:** Get Jellyfin working first. Optimize transcoding second.

---

## Local Playback vs Remote Playback

If your clients can direct-play the files you have, Jellyfin does much less work.

That means:

- lower CPU usage
- fewer transcoding bottlenecks
- less need for GPU passthrough

So before chasing GPU complexity, check whether your devices already support the formats you use.

Sometimes the easiest performance win is better client compatibility, not more hardware.

---

## Should Jellyfin Be Public?

Usually, I recommend one of these first:

- LAN only
- Tailscale only

Jellyfin is one of the few services in this guide that people often *do* want to access remotely without a VPN, but if you go that route later, do it with deliberate reverse proxy and TLS setup, not raw port exposure.

---

## Next Steps

Next, we will build out the music side of the stack.

Proceed to [Music](/blueprint/16-music).

---

> **Last updated:** March 2026<br>
