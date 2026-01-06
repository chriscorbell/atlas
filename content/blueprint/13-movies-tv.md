---
title: "Movies/TV Libraries"
phase: "Phase 13"
weight: 13
---

This page sets up:
- **Sonarr** (TV)
- **Radarr** (Movies)
- Optional: **Jellyseerr** (requests)

## 1) Create folders on NAS
Suggested:
- `/mnt/nas/media/tv`
- `/mnt/nas/media/movies`
- `/mnt/nas/media/downloads`

## 2) Docker Compose
Create: `~/docker/compose/media/arr.compose.yml`

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
      - ~/docker/appdata/sonarr:/config
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
      - ~/docker/appdata/radarr:/config
      - /mnt/nas/media/movies:/movies
      - /mnt/nas/media/downloads:/downloads
    ports:
      - "7878:7878"
    restart: unless-stopped
    networks: [proxy]

  jellyseerr:
    image: fallenbagel/jellyseerr:latest
    container_name: jellyseerr
    environment:
      - TZ=America/New_York
    volumes:
      - ~/docker/appdata/jellyseerr:/app/config
    ports:
      - "5055:5055"
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/media/arr.compose.yml up -d
```

## 3) Configure Sonarr/Radarr (high level)
1. Add download client (qBittorrent)
2. Add root folders:
   - Sonarr: `/tv`
   - Radarr: `/movies`
3. Add indexers (optional; many people use Prowlarr)
4. Test a download → confirm import

## Next
Proceed to: **[Jellyfin](14-jellyfin.md)**


---
**Navigation:** ← [Torrents: qBittorrent + VueTorrent + Gluetun](12-torrents.md) | [Jellyfin (Media Streaming + Hardware Acceleration)](14-jellyfin.md) →
