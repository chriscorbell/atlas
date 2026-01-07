---
title: "FileBrowser"
phase: "Phase 10"
weight: 10
---

FileBrowser provides a simple web UI to manage files on your NAS mounts.

## 1) Create directories
```bash
mkdir -p ~/docker/appdata/filebrowser
```

## 2) Docker Compose
Create: `~/docker/compose/core/filebrowser.compose.yml`

```yaml
services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: filebrowser
    volumes:
      - /mnt/nas:/srv
      - ~/docker/appdata/filebrowser/filebrowser.db:/database/filebrowser.db
      - ~/docker/appdata/filebrowser/settings.json:/config/settings.json
    environment:
      - PUID=1000
      - PGID=1000
    ports:
      - "8081:80"
    restart: unless-stopped
    networks:
      - proxy

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/core/filebrowser.compose.yml up -d
```

Open:
- `http://<debian-ip>:8081`

## Next
Proceed to: **[Crafty Minecraft](10-crafty-minecraft.md)**


---
**Navigation:** ← [Docker Engine + Compose + Utilities](08-docker-basics.md) | [Minecraft Server: Crafty (+ Port Forwarding)](10-crafty-minecraft.md) →
