---
title: "Domain"
phase: "Phase 23"
weight: 23
---

This page covers using a domain + Cloudflare DNS and setting up **Caddy** as a reverse proxy.

## Choose your access model
### Model A (recommended): private-only via Tailscale
- No port forwarding
- Access services from anywhere via tailnet IP/name
- Most secure for beginners

### Model B: public HTTPS access
- Requires forwarding ports 80/443
- Requires strong security practices
- Consider Cloudflare Tunnel if you want fewer inbound ports

## 1) Buy a domain + add to Cloudflare
1. Register a domain
2. Add it to Cloudflare
3. Update nameservers at the registrar to Cloudflare’s nameservers

## 2) Plan your subdomains
Examples:
- `jellyfin.example.com`
- `immich.example.com`
- `n8n.example.com`

## 3) Run Caddy in Docker
Create: `~/docker/compose/core/caddy.compose.yml`

```yaml
services:
  caddy:
    image: caddy:latest
    container_name: caddy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ~/docker/appdata/caddy/Caddyfile:/etc/caddy/Caddyfile
      - ~/docker/appdata/caddy/data:/data
      - ~/docker/appdata/caddy/config:/config
    restart: unless-stopped
    networks:
      - proxy

networks:
  proxy:
    external: true
```

### Example Caddyfile
Create: `~/docker/appdata/caddy/Caddyfile`

```caddy
jellyfin.example.com {
  reverse_proxy jellyfin:8096
}

n8n.example.com {
  reverse_proxy n8n:5678
}

file.example.com {
  reverse_proxy filebrowser:80
}
```

Start:
```bash
docker compose -f ~/docker/compose/core/caddy.compose.yml up -d
```

## 4) DNS records in Cloudflare
- For public access: point A/AAAA records to your public IP
- For Tailscale-only: you can point to Tailscale IP for your own devices, but it won’t be globally reachable

## Next
Proceed to: **[Backup NAS + Replication](23-backup-nas-replication.md)**


---
**Navigation:** ← [Auto Updates: Watchtower](21-watchtower.md) | [Backup NAS + ZFS Replication](23-backup-nas-replication.md) →
