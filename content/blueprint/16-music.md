---
title: "Music"
phase: "Phase 16"
weight: 16
---

> Use acquisition tools legally and responsibly.

## 1) slskd
Create: `~/docker/compose/media/slskd.compose.yml`

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
      - ~/docker/appdata/slskd:/app
      - /mnt/nas/media/music:/music
      - /mnt/nas/media/downloads:/downloads
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/media/slskd.compose.yml up -d
```

## 2) Lidarr
Create: `~/docker/compose/media/lidarr.compose.yml`

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
      - ~/docker/appdata/lidarr:/config
      - /mnt/nas/media/music:/music
      - /mnt/nas/media/downloads:/downloads
    ports:
      - "8686:8686"
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/media/lidarr.compose.yml up -d
```

## Next
Proceed to: **[Navidrome](16-navidrome.md)**


---
**Navigation:** ← [Jellyfin (Media Streaming + Hardware Acceleration)](14-jellyfin.md) | [Music Server: Navidrome (+ Mobile Clients)](16-navidrome.md) →
