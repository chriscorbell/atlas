---
title: "Web Server: NGINX"
phase: "Phase 11"
weight: 11
---

NGINX is useful for learning web hosting and serving simple static sites.

## 1) Create content directory
```bash
mkdir -p ~/docker/appdata/nginx/html
printf '<h1>Hello from NGINX</h1>
' > ~/docker/appdata/nginx/html/index.html
```

## 2) Docker Compose
Create: `~/docker/compose/core/nginx.compose.yml`

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "8080:80"
    volumes:
      - ~/docker/appdata/nginx/html:/usr/share/nginx/html:ro
      - ~/docker/appdata/nginx/conf.d:/etc/nginx/conf.d:ro
    restart: unless-stopped
    networks:
      - proxy

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/core/nginx.compose.yml up -d
```

Open:
- `http://<debian-ip>:8080`

## Next
Proceed to: **[Torrents](12-torrents.md)**


---
**Navigation:** ← [Minecraft Server: Crafty (+ Port Forwarding)](10-crafty-minecraft.md) | [Torrents: qBittorrent + VueTorrent + Gluetun](12-torrents.md) →
