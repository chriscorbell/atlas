---
title: "Domain"
phase: "Phase 23"
weight: 23
---

> **Prerequisite:** [Watchtower](/blueprint/22-watchtower)

This page is where you need to make an intentional decision:

- do you actually need public access?

For many home setups, the answer is still **no**, and Tailscale remains the better default.

But sometimes you do want a real domain and clean HTTPS access, especially for services you plan to use frequently from many devices.

If you go down that path, do it deliberately.

---

## Access Models

### Private-Only Access

This is still my recommended default.

- no public port forwarding
- access services over LAN or Tailscale
- lowest operational burden

### Public HTTPS Access

This is appropriate when:

- you genuinely need browser-friendly public URLs
- you understand that public exposure increases your attack surface
- you are willing to maintain it properly

If that describes you, keep reading.

---

## Buy a Domain and Add It to Cloudflare

At a high level:

1. register a domain from the registrar of your choice
2. add it to Cloudflare
3. change the registrar nameservers to the ones Cloudflare gives you

Once that is done, Cloudflare will manage DNS for your domain.

---

## Plan Your Public Surface Area

Do **not** expose everything just because you can.

Reasonable candidates:

- `jellyfin.example.com`
- `immich.example.com`
- `navidrome.example.com`

Bad candidates:

- Proxmox
- TrueNAS
- qBittorrent
- most raw admin dashboards

Keep core infrastructure private.

---

## Why Use Caddy Here?

Because for many people it is the most painless route to:

- reverse proxying
- automatic HTTPS
- readable configuration

You can absolutely use NGINX or Traefik instead. Caddy is simply easier to recommend to most people for this stage.

---

## Create the Caddy Stack

Create the directories:

```bash
mkdir -p ~/docker/appdata/caddy/{data,config}
mkdir -p ~/docker/compose/core
```

Create `~/docker/compose/core/caddy.compose.yml`:

```yaml
services:
  caddy:
    image: caddy:latest
    container_name: caddy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /home/<your-user>/docker/appdata/caddy/Caddyfile:/etc/caddy/Caddyfile
      - /home/<your-user>/docker/appdata/caddy/data:/data
      - /home/<your-user>/docker/appdata/caddy/config:/config
    restart: unless-stopped
    networks:
      - proxy

networks:
  proxy:
    external: true
```

Then create `~/docker/appdata/caddy/Caddyfile`:

```caddy
jellyfin.example.com {
  reverse_proxy jellyfin:8096
}

navidrome.example.com {
  reverse_proxy navidrome:4533
}

immich.example.com {
  reverse_proxy immich-server:2283
}
```

Adjust the service names and ports to match your actual containers.

Start Caddy:

```bash
docker compose -f ~/docker/compose/core/caddy.compose.yml up -d
```

---

## Router and DNS Requirements

For standard public HTTPS access with automatic certificates:

- forward TCP `80` to the NixOS VM
- forward TCP `443` to the NixOS VM
- create DNS records in Cloudflare pointing the relevant subdomains at your public IP

If your home IP changes periodically, you may also want dynamic DNS.

---

## A Few Rules Worth Following

- expose only the services that benefit from it
- keep admin UIs private
- use strong authentication on anything public
- prefer a small public surface over a big clever one

If you are unsure whether something should be public, the safer answer is usually "no".

---

## Cloudflare Is Not a Magic Security Blanket

Cloudflare can absolutely be useful, but adding Cloudflare does **not** automatically make a badly exposed service safe.

You still need to think about:

- authentication
- updates
- backups
- what the service actually does if compromised

Do not outsource your judgment to a CDN.

---

## Next Steps

Next, we will tie the whole system together with a backup strategy that covers more than just "the disks did not fail today".

Proceed to [Backups](/blueprint/24-backup).

---

> **Last updated:** March 2026<br>
