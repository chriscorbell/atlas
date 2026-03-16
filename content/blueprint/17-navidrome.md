---
title: "Navidrome"
phase: "Phase 17"
weight: 17
---

> **Prerequisite:** [Music](/blueprint/16-music)

**Navidrome** is one of the nicest examples of a self-hosted app that just does its job well.

It is a lightweight music server with Subsonic-compatible clients, good mobile support, and a much lower operational footprint than a full "do everything" media server.

If your goal is "my own Spotify-like experience for my personal library", Navidrome is a strong answer.

---

## Create the Directories

```bash
mkdir -p ~/docker/appdata/navidrome
mkdir -p ~/docker/compose/media
```

Your music library itself should already exist at:

```text
/mnt/nas/media/music
```

---

## Create the Compose File

Create `~/docker/compose/media/navidrome.compose.yml`:

```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    ports:
      - "4533:4533"
    environment:
      - ND_SCANSCHEDULE=1h
      - ND_LOGLEVEL=info
      - ND_SESSIONTIMEOUT=24h
      - TZ=America/New_York
    volumes:
      - /home/<your-user>/docker/appdata/navidrome:/data
      - /mnt/nas/media/music:/music:ro
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start it:

```bash
docker compose -f ~/docker/compose/media/navidrome.compose.yml up -d
```

Then open:

```text
http://<nixos-ip>:4533
```

---

## Initial Setup

Create your admin account on first launch, then let Navidrome scan the library.

Because the music folder is mounted read-only, Navidrome can index the library without being able to accidentally modify the media files themselves.

That is usually the right default for a playback server.

---

## Client Apps

One of Navidrome's biggest strengths is its client ecosystem.

Popular choices include:

- **Symfonium** on Android
- **Play:Sub** on iOS
- any other Subsonic-compatible client you prefer

If you use Tailscale, point those clients at your Tailscale hostname or address instead of exposing Navidrome publicly right away.

That gives you remote access with much less hassle.

---

## Why Keep This Separate from Jellyfin?

Jellyfin can also serve music, so it is fair to ask why you would bother with Navidrome at all.

My answer is simple:

- Jellyfin is good at being a broad media server
- Navidrome is better at being a focused music server

If music matters to you, Navidrome is usually the nicer day-to-day experience.

---

## Next Steps

Next, we will move from media playback into photo management with Immich.

Proceed to [Immich](/blueprint/18-immich).

---

> **Last updated:** March 2026<br>
