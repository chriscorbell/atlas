---
title: "NGINX"
phase: "Phase 12"
weight: 12
---

> **Prerequisite:** [Crafty](/blueprint/11-crafty)

At some point, exposing every service on a random high port starts to get messy.

You can solve that with a reverse proxy. In this guide, we will first use **NGINX** in a very simple way so the idea is easy to understand before we later discuss domains and more polished external access.

If you do not care about learning the web-serving side of self-hosting yet, you can skim this page and move on.

---

## What NGINX Is Doing for You

At a high level, a reverse proxy:

- listens on one front-facing port
- forwards requests to the correct internal service
- can later handle hostnames, TLS and access control

For now, we will keep it simple and use NGINX both as:

- a basic static web server
- a place to learn the pattern

---

## Create Directories

```bash
mkdir -p ~/docker/appdata/nginx/html
mkdir -p ~/docker/appdata/nginx/conf.d
mkdir -p ~/docker/compose/core
```

Create a tiny test page:

```bash
printf '<h1>Hello from NGINX</h1>\n' > ~/docker/appdata/nginx/html/index.html
```

---

## Create the Compose File

Create `~/docker/compose/core/nginx.compose.yml`:

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "8080:80"
    volumes:
      - /home/<your-user>/docker/appdata/nginx/html:/usr/share/nginx/html:ro
      - /home/<your-user>/docker/appdata/nginx/conf.d:/etc/nginx/conf.d:ro
    restart: unless-stopped
    networks:
      - proxy

networks:
  proxy:
    external: true
```

Replace `/home/<your-user>` with your actual home directory path.

---

## Start It

```bash
docker compose -f ~/docker/compose/core/nginx.compose.yml up -d
```

Then visit:

```text
http://<nixos-ip>:8080
```

You should see the test page.

---

## Why This Matters Even If You Switch Later

You may eventually decide you prefer:

- Caddy
- Traefik
- Cloudflare Tunnel

That is fine.

The point of this page is not "NGINX is the only correct answer".

The point is to understand the pattern:

- a service is running internally
- a reverse proxy can present it cleanly
- later, hostnames and HTTPS can sit on top of that

Once you understand that, switching tools is much easier.

---

## Keep It Private for Now

There is no need to expose this to the public internet yet.

Reach it over:

- your LAN
- or Tailscale

That keeps the learning surface manageable.

---

## Next Steps

Next, we will move into one of the more common home-lab use cases: download automation and BitTorrent.

Proceed to [BitTorrent](/blueprint/13-bittorrent).

---

> **Last updated:** March 2026<br>
