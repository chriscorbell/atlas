---
title: "FileBrowser"
phase: "Phase 10"
weight: 10
---

> **Prerequisite:** [Docker](/blueprint/09-docker)

Before jumping into media servers and automation stacks, it is useful to deploy something simple that proves your environment is working.

**FileBrowser** is a good first container because it lets you inspect and manage files in your NAS mounts from a web UI.

That makes it handy for:

- sanity-checking your SMB/NFS mounts
- creating folders from a browser
- moving files around without constantly using SSH

---

## Why Use This First?

Because it validates several layers at once:

- Docker is working
- your `appdata` path is writable
- your NAS mounts are accessible
- your NixOS VM can serve a web UI normally

If this page works cleanly, the rest of the stack gets easier.

---

## Create the Appdata Directory

```bash
mkdir -p ~/docker/appdata/filebrowser
mkdir -p ~/docker/compose/core
```

---

## Create the Compose File

Create `~/docker/compose/core/filebrowser.compose.yml` with the following contents:

```yaml
services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: filebrowser
    ports:
      - "8081:80"
    volumes:
      - /mnt/nas:/srv
      - /home/<your-user>/docker/appdata/filebrowser/database.db:/database/filebrowser.db
      - /home/<your-user>/docker/appdata/filebrowser/settings.json:/config/settings.json
    restart: unless-stopped
    networks:
      - proxy

networks:
  proxy:
    external: true
```

> Replace `/home/<your-user>` with your actual home directory path.

If you skipped TrueNAS and do not have `/mnt/nas` mounted yet, you can temporarily point `/srv` at a local path instead, such as `/home/<your-user>`.

---

## Start the Container

```bash
docker compose -f ~/docker/compose/core/filebrowser.compose.yml up -d
```

Then confirm it is running:

```bash
docker ps
```

---

## Access FileBrowser

From another computer on your LAN or from a Tailscale-connected device, open:

```text
http://<nixos-ip>:8081
```

The default login for FileBrowser is commonly:

- Username: `admin`
- Password: `admin`

If that is still true for your deployment, log in and change it immediately.

> **WARNING:** Do not expose FileBrowser directly to the public internet with a default password, ever.

---

## What to Do With It

Use FileBrowser to confirm you can see:

- your NAS shares under `/srv/media`, `/srv/photos`, etc.
- new folders you create from the web UI
- files written by your user account

If permissions look wrong, fix that now before you start stacking more services on top of those same paths.

---

## When Not to Use It

FileBrowser is convenient, but it is not a replacement for:

- proper NAS permissions design
- a real backup strategy
- terminal access when you need precise control

Think of it as a practical utility, not as the canonical interface to your filesystem.

---

## Next Steps

Next, we will look at one of the more optional but fun services in the stack: running a Minecraft server through Crafty.

Proceed to [Crafty](/blueprint/11-crafty).

---

> **Last updated:** March 2026<br>
