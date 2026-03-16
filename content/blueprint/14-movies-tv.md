---
title: "Movies/TV"
phase: "Phase 14"
weight: 14
---

> **Prerequisite:** [BitTorrent](/blueprint/13-bittorrent)

This is where media automation starts to feel like an actual system instead of a collection of unrelated containers.

For movies and TV, the core pieces are:

- **Sonarr** for TV
- **Radarr** for movies
- optional **Prowlarr** for indexer management
- optional **Jellyseerr** for user-friendly requests

You do not need every component on day one, but Sonarr and Radarr are the center of gravity here.

---

## Folder Layout Matters

Before deploying anything, make sure your media paths are sensible.

I recommend:

- `/mnt/nas/media/tv`
- `/mnt/nas/media/movies`
- `/mnt/nas/media/downloads`

These are important because Sonarr and Radarr need stable, predictable paths for:

- completed downloads
- library import
- renaming and organizing files

If the download client sees a path that the automation stack does not, you will get confusing import failures later.

---

## Create Directories

```bash
mkdir -p /mnt/nas/media/{tv,movies,downloads}
mkdir -p ~/docker/appdata/{sonarr,radarr,prowlarr,jellyseerr}
mkdir -p ~/docker/compose/media
```

---

## Create the Compose File

Create `~/docker/compose/media/movies-tv.compose.yml`:

```yaml
services:
  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /home/<your-user>/docker/appdata/sonarr:/config
      - /mnt/nas/media/tv:/tv
      - /mnt/nas/media/downloads:/downloads
    ports:
      - "8989:8989"
    restart: unless-stopped
    networks: [proxy]

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /home/<your-user>/docker/appdata/radarr:/config
      - /mnt/nas/media/movies:/movies
      - /mnt/nas/media/downloads:/downloads
    ports:
      - "7878:7878"
    restart: unless-stopped
    networks: [proxy]

  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /home/<your-user>/docker/appdata/prowlarr:/config
    ports:
      - "9696:9696"
    restart: unless-stopped
    networks: [proxy]

  jellyseerr:
    image: fallenbagel/jellyseerr:latest
    container_name: jellyseerr
    environment:
      - TZ=America/New_York
    volumes:
      - /home/<your-user>/docker/appdata/jellyseerr:/app/config
    ports:
      - "5055:5055"
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

---

## Start the Stack

```bash
docker compose -f ~/docker/compose/media/movies-tv.compose.yml up -d
```

Access the services at:

- Sonarr: `http://<nixos-ip>:8989`
- Radarr: `http://<nixos-ip>:7878`
- Prowlarr: `http://<nixos-ip>:9696`
- Jellyseerr: `http://<nixos-ip>:5055`

---

## First-Time Configuration Order

The cleanest setup order is:

1. Configure qBittorrent first and confirm it downloads successfully
2. Configure Prowlarr with your indexers if you plan to use it
3. Connect Sonarr and Radarr to Prowlarr
4. Add qBittorrent as the download client in Sonarr and Radarr
5. Set root folders:
   - Sonarr: `/tv`
   - Radarr: `/movies`
6. Trigger a test download and confirm it imports automatically

The key is to verify the full chain, not just that each web UI opens.

---

## Path Consistency Is Not Optional

This is one of the most common failure points.

If qBittorrent downloads to one path and Sonarr/Radarr expect another path that does not line up inside the containers, imports will fail or require ugly remote path mapping workarounds.

You want the paths to make intuitive sense from the start.

That is why this guide keeps `/downloads` mounted into all of the relevant containers directly.

---

## Keep It Private

Like the torrent client, these services are usually best kept private:

- LAN only
- or Tailscale only

Especially the admin UIs.

If you later want a polished request portal for family, Jellyseerr is the first service in this group that arguably makes sense to expose more widely, but do that intentionally, not by accident.

---

## Next Steps

Now that you can acquire and organize media, the next step is actually consuming it cleanly.

Proceed to [Jellyfin](/blueprint/15-jellyfin).

---

> **Last updated:** March 2026<br>
