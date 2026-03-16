---
title: "Music"
phase: "Phase 16"
weight: 16
---

> **Prerequisite:** [Jellyfin](/blueprint/15-jellyfin)

> **Use acquisition tools legally and responsibly.**

Movies and TV are only half the story for a lot of people. If you also want to build out a personal music library, the two common pieces here are:

- **Lidarr** for music library management
- **slskd** as an optional acquisition tool and Soulseek client

If you already have a music library and just want to serve it, you can skim this page and proceed directly to Navidrome.

---

## What This Page Is Actually For

The point is not to create "a bunch more containers".

The point is to create a workflow where:

- music files land in a predictable place
- metadata and organization are manageable
- your playback server can scan a stable library path

That same pattern should look familiar by now from the movies/TV stack.

---

## Create the Directories

```bash
mkdir -p /mnt/nas/media/music
mkdir -p /mnt/nas/media/downloads/music
mkdir -p ~/docker/appdata/{lidarr,slskd}
mkdir -p ~/docker/compose/media
```

If you do not have a NAS mounted yet, substitute local directories and migrate later.

---

## Deploy `slskd` (Optional)

If you want a web-managed Soulseek client, create `~/docker/compose/media/slskd.compose.yml`:

```yaml
services:
  slskd:
    image: slskd/slskd:latest
    container_name: slskd
    ports:
      - "5030:5030"
    environment:
      - SLSKD_REMOTE_CONFIGURATION=true
    volumes:
      - /home/<your-user>/docker/appdata/slskd:/app
      - /mnt/nas/media/music:/music
      - /mnt/nas/media/downloads/music:/downloads
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start it:

```bash
docker compose -f ~/docker/compose/media/slskd.compose.yml up -d
```

Then open:

```text
http://<nixos-ip>:5030
```

If you do not need this part, skip it. Lidarr can still be useful for library management on its own.

---

## Deploy Lidarr

Create `~/docker/compose/media/lidarr.compose.yml`:

```yaml
services:
  lidarr:
    image: lscr.io/linuxserver/lidarr:latest
    container_name: lidarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /home/<your-user>/docker/appdata/lidarr:/config
      - /mnt/nas/media/music:/music
      - /mnt/nas/media/downloads/music:/downloads
    ports:
      - "8686:8686"
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start it:

```bash
docker compose -f ~/docker/compose/media/lidarr.compose.yml up -d
```

Open:

```text
http://<nixos-ip>:8686
```

---

## Configure the Flow

At a high level:

1. Set your Lidarr root folder to `/music`
2. Add your download client if you are using one
3. Point completed downloads at the same download path the container can see
4. Test with a small album before scaling up

The same warning from Sonarr/Radarr applies here too:

- path consistency matters

If Lidarr cannot see the same download path that the client sees, imports become awkward very quickly.

---

## Keep Expectations Reasonable

Music automation is often messier than TV and movies because:

- metadata quality varies more
- release naming is inconsistent
- multi-disc and special editions are common

That is normal.

Expect some manual cleanup, especially at the beginning.

---

## Next Steps

Next, we will serve the music library cleanly using Navidrome.

Proceed to [Navidrome](/blueprint/17-navidrome).

---

> **Last updated:** March 2026<br>
