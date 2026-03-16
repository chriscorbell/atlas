---
title: "BitTorrent"
phase: "Phase 13"
weight: 13
---

> **Prerequisite:** [NGINX](/blueprint/12-nginx)

> **Use torrents legally and responsibly.**

For media automation, the torrent client is one of the core building blocks.

The stack I recommend here is:

- **qBittorrent** for the actual BitTorrent client
- **Gluetun** to force that traffic through your VPN
- optional **VueTorrent** as a nicer qBittorrent web UI

The important concept is this:

> If you use BitTorrent, route that traffic through a VPN on purpose. Do not treat that as optional hygiene.

---

## Why qBittorrent + Gluetun?

Because it solves the right problem cleanly:

- qBittorrent is reliable and widely supported
- Gluetun provides a VPN container that other containers can share
- if the VPN is down, the torrent client should not quietly fall back to your normal WAN path

That containment matters.

---

## Prepare Download Paths

Create a place for in-progress and completed downloads.

If you have TrueNAS mounted, I recommend keeping this on the NAS:

```bash
mkdir -p /mnt/nas/media/downloads
mkdir -p /mnt/nas/media/downloads/torrents
mkdir -p ~/docker/appdata/qbittorrent
mkdir -p ~/docker/compose/downloads
```

If you skipped TrueNAS, use a local path for now and migrate later.

---

## Create the Compose File

Create `~/docker/compose/downloads/bittorrent.compose.yml`:

```yaml
services:
  gluetun:
    image: qmcgaw/gluetun:latest
    container_name: gluetun
    cap_add:
      - NET_ADMIN
    ports:
      - "8082:8080"
      - "6881:6881"
      - "6881:6881/udp"
    environment:
      - VPN_SERVICE_PROVIDER=YOUR_PROVIDER
      - OPENVPN_USER=YOUR_USERNAME
      - OPENVPN_PASSWORD=YOUR_PASSWORD
      - SERVER_COUNTRIES=United States
      - TZ=America/New_York
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
      - /home/<your-user>/docker/appdata/qbittorrent:/config
      - /mnt/nas/media/downloads:/downloads
    restart: unless-stopped
```

Replace the VPN variables with values for your provider.

If your provider prefers WireGuard instead of OpenVPN, follow the Gluetun documentation for the appropriate environment variables.

---

## Start the Stack

```bash
docker compose -f ~/docker/compose/downloads/bittorrent.compose.yml up -d
```

Open qBittorrent at:

```text
http://<nixos-ip>:8082
```

Set a new admin password immediately.

---

## Optional: VueTorrent

If you want a more modern interface, use **VueTorrent** as qBittorrent's custom web UI:

<a href="https://github.com/VueTorrent/VueTorrent" target="_blank" rel="noopener">https://github.com/VueTorrent/VueTorrent</a>

I am not putting it in the baseline compose file because qBittorrent itself is the critical piece, not the skin on top.

Get the client working first. Make it pretty second.

---

## Test the VPN Assumption

Do not just assume the VPN path is working because the container started.

Verify:

- qBittorrent is reachable
- downloads can start normally
- the VPN container logs look healthy
- you understand which container actually owns the network namespace

If you do not understand that last point, stop and fix that before layering automation on top of it.

---

## Security and Exposure

My recommendation:

- keep qBittorrent private
- access it only from LAN or Tailscale

There is almost never a good reason to expose your torrent client's web UI publicly.

---

## Next Steps

Next, we will add the automation layer on top of this: Sonarr, Radarr and related services for movies and TV.

Proceed to [Movies/TV](/blueprint/14-movies-tv).

---

> **Last updated:** March 2026<br>
