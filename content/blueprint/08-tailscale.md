---
title: "Tailscale"
phase: "Phase 8"
weight: 8
---

Tailscale gives you secure remote access without port forwarding.

## 1) Install on Debian
```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```
Follow the login URL.

## 2) Install on clients
Install Tailscale on:
- your phone
- your laptop/desktop
Log into the same account.

## 3) Enable MagicDNS (recommended)
In the Tailscale admin console:
- DNS → enable MagicDNS

## 4) Optional: subnet routing
If you want remote access to your entire LAN:
```bash
sudo tailscale up --advertise-routes=192.168.1.0/24
```
Approve routes in the admin console.

## Next
Proceed to: **[Docker Engine + Compose](08-docker-basics.md)**


---
**Navigation:** ← [NAS Access from Debian (SMB/NFS Mounts)](06-nas-mounts.md) | [Docker Engine + Compose + Utilities](08-docker-basics.md) →
