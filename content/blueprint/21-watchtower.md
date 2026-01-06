---
title: "Watchtower"
phase: "Phase 21"
weight: 21
---

Watchtower can automatically update your Docker containers.

> **Caution:** automatic updates can occasionally break things. Consider using it for low-risk containers first.

## Docker Compose
Create: `~/docker/compose/core/watchtower.compose.yml`

```yaml
services:
  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - TZ=America/New_York
      - WATCHTOWER_SCHEDULE=0 0 4 * * *
      - WATCHTOWER_CLEANUP=true
    restart: unless-stopped
```

Start:
```bash
docker compose -f ~/docker/compose/core/watchtower.compose.yml up -d
```

## Next
Proceed to: **[Domain + Cloudflare + Caddy](22-domain-cloudflare-caddy.md)**


---
**Navigation:** ← [Document Management: Paperless-ngx](20-paperless-ngx.md) | [Domain + Cloudflare + Caddy Reverse Proxy](22-domain-cloudflare-caddy.md) →
