---
title: "Navidrome"
phase: "Phase 17"
weight: 17
---

Navidrome is a lightweight music server compatible with Subsonic clients.

## 1) Docker Compose
Create: `~/docker/compose/media/navidrome.compose.yml`

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
      - ~/docker/appdata/navidrome:/data
      - /mnt/nas/media/music:/music:ro
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/media/navidrome.compose.yml up -d
```

Open:
- `http://<debian-ip>:4533`

## 2) Recommended mobile clients
- Android: **Symfonium**
- iOS: **Play:Sub** (or any Subsonic-compatible client)

If you use Tailscale, point the client at the Tailscale IP/name for secure remote access.

## Next
Proceed to: **[Immich](17-immich.md)**


---
**Navigation:** ← [Music Acquisition: slskd + Lidarr](15-slskd-lidarr.md) | [Photos: Immich (+ Mobile Backup over Tailscale)](17-immich.md) →
