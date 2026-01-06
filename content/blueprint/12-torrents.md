---
title: "Torrents: qBittorrent + VueTorrent + Gluetun"
phase: "Phase 12"
weight: 12
---

> Use torrents legally and responsibly.

## Why Gluetun?
Gluetun routes traffic through your VPN provider and can prevent qBittorrent from leaking traffic outside the VPN.

## 1) Create download directories on NAS
Suggested:
- `/mnt/nas/media/downloads`

## 2) Docker Compose
Create: `~/docker/compose/downloads/torrents.compose.yml`

```yaml
services:
  gluetun:
    image: qmcgaw/gluetun:latest
    container_name: gluetun
    cap_add:
      - NET_ADMIN
    environment:
      - VPN_SERVICE_PROVIDER=YOUR_PROVIDER
      - OPENVPN_USER=YOUR_USER
      - OPENVPN_PASSWORD=YOUR_PASS
      - SERVER_COUNTRIES=United States
    ports:
      - "8082:8080"   # qBittorrent WebUI via Gluetun
      - "6881:6881"
      - "6881:6881/udp"
    restart: unless-stopped

  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    network_mode: "service:gluetun"
    depends_on:
      - gluetun
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
      - WEBUI_PORT=8080
    volumes:
      - ~/docker/appdata/qbittorrent:/config
      - /mnt/nas/media/downloads:/downloads
    restart: unless-stopped

  vuetorrent:
    image: ghcr.io/vuetorrent/vuetorrent:latest
    container_name: vuetorrent
    ports:
      - "3000:3000"
    restart: unless-stopped
```

Start:
```bash
docker compose -f ~/docker/compose/downloads/torrents.compose.yml up -d
```

Open:
- qBittorrent: `http://<debian-ip>:8082`
- VueTorrent: `http://<debian-ip>:3000`

## Next
Proceed to: **[*arr stack](13-arr-stack.md)**


---
**Navigation:** ← [Web Server: NGINX (Static Sites)](11-nginx.md) | [The *arr Stack: Sonarr + Radarr (+ Jellyseerr)](13-arr-stack.md) →
