---
title: "Minecraft Server: Crafty"
phase: "Phase 10"
weight: 10
---

Crafty is a web UI for managing one or more Minecraft servers.

## 1) Docker Compose
Create: `~/docker/compose/minecraft/crafty.compose.yml`

```yaml
services:
  crafty:
    image: registry.gitlab.com/crafty-controller/crafty-4:latest
    container_name: crafty
    environment:
      - TZ=America/New_York
    ports:
      - "8443:8443"   # Crafty UI
      - "25565:25565" # Minecraft server
    volumes:
      - ~/docker/appdata/crafty/backups:/crafty/backups
      - ~/docker/appdata/crafty/logs:/crafty/logs
      - ~/docker/appdata/crafty/servers:/crafty/servers
      - ~/docker/appdata/crafty/config:/crafty/app/config
      - ~/docker/appdata/crafty/import:/crafty/import
    restart: unless-stopped
```

Start:
```bash
docker compose -f ~/docker/compose/minecraft/crafty.compose.yml up -d
```

Open:
- `https://<debian-ip>:8443`

## 2) Port forwarding (only if you want public access)
Forward on your router:
- TCP/UDP `25565` → Debian VM IP

### Safer alternative: Tailscale
If your friends can use Tailscale, you can avoid exposing ports publicly.

## Next
Proceed to: **[NGINX](11-nginx.md)**


---
**Navigation:** ← [File Management: FileBrowser](09-filebrowser.md) | [Web Server: NGINX (Static Sites)](11-nginx.md) →
