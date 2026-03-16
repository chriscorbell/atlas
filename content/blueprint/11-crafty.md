---
title: "Crafty"
phase: "Phase 11"
weight: 11
---

> **Prerequisite:** [FileBrowser](/blueprint/10-filebrowser)

This page is optional, but it is a common reason people start self-hosting in the first place.

**Crafty Controller** gives you a web UI for managing Minecraft servers, backups and configuration without doing everything manually over SSH.

If you have no interest in Minecraft, skip this page and move on.

---

## Why Run It This Way?

Because Minecraft servers are one of the easier ways to learn the tradeoffs of self-hosting:

- CPU and RAM allocation matter
- backups matter
- modpacks complicate things
- public exposure changes the risk profile immediately

Crafty helps by giving you a cleaner management layer than "just throw a Java command in a screen session".

---

## Prepare Directories

```bash
mkdir -p ~/docker/appdata/crafty/{backups,logs,servers,config,import}
mkdir -p ~/docker/compose/minecraft
```

---

## Create the Compose File

Create `~/docker/compose/minecraft/crafty.compose.yml`:

```yaml
services:
  crafty:
    image: registry.gitlab.com/crafty-controller/crafty-4:latest
    container_name: crafty
    environment:
      - TZ=America/New_York
    ports:
      - "8443:8443"
      - "25565:25565"
      - "25565:25565/udp"
    volumes:
      - /home/<your-user>/docker/appdata/crafty/backups:/crafty/backups
      - /home/<your-user>/docker/appdata/crafty/logs:/crafty/logs
      - /home/<your-user>/docker/appdata/crafty/servers:/crafty/servers
      - /home/<your-user>/docker/appdata/crafty/config:/crafty/app/config
      - /home/<your-user>/docker/appdata/crafty/import:/crafty/import
    restart: unless-stopped
```

Again, replace `/home/<your-user>` with your actual home directory path.

---

## Start Crafty

```bash
docker compose -f ~/docker/compose/minecraft/crafty.compose.yml up -d
```

Then open:

```text
https://<nixos-ip>:8443
```

Because Crafty uses a self-signed certificate by default, your browser will likely warn you. That is expected on first setup.

---

## Resource Planning

Minecraft can consume a surprising amount of RAM and CPU depending on:

- player count
- world size
- view distance
- plugins/mods

If the server performs poorly:

- lower view distance
- allocate more RAM to the Minecraft instance itself
- avoid oversubscribing your VM if several other services are busy

If this box is primarily for storage and media, be realistic about how much game-server load you want to mix into it.

---

## Public Access vs Private Access

If only you or a small group of trusted friends need access, the safest option is:

- everyone joins via Tailscale

That avoids exposing the game server directly to the public internet.

If you do want normal public internet access, you will need to forward the appropriate router port(s) to the NixOS VM.

For vanilla Java edition, that is commonly:

- TCP `25565`

But before doing that, understand the tradeoff:

- the moment you expose a game server publicly, it becomes part of your attack surface

That is not automatically a deal-breaker. It just means you should do it intentionally.

---

## Backups Matter Here

Minecraft worlds are one of those things people assume they can "just recreate" right up until they lose months of work.

At a minimum:

- keep Crafty backups enabled
- store backups somewhere other than only the live container path
- consider copying important worlds to your NAS backup area

We will come back to broader backup strategy later.

---

## Next Steps

Next, we will set up a basic web server and reverse proxy foundation so your container stack can be presented more cleanly.

Proceed to [NGINX](/blueprint/12-nginx).

---

> **Last updated:** March 2026<br>
