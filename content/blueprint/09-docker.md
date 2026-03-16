---
title: "Docker"
phase: "Phase 9"
weight: 9
---

> **Prerequisite:** [Tailscale](/blueprint/08-tailscale)

This page is where your NixOS VM becomes a practical application host.

Docker is not the only way to self-host software, and NixOS can absolutely run many services natively, but Docker remains the easiest common denominator for a mixed stack of popular applications.

The goal here is not just "install Docker". The goal is to put a clean structure in place so the rest of your services do not devolve into a pile of random directories and half-remembered commands.

---

## Confirm Docker Is Enabled

If you followed the NixOS page, Docker should already be enabled in `configuration.nix`.

Confirm that it is available:

```bash
docker version
docker compose version
```

If `docker compose version` fails but `docker-compose` works, that is acceptable. The rest of this guide uses `docker compose` for readability.

---

## Create a Directory Layout

Pick a home for your compose files and persistent application data.

I recommend this layout inside your normal user's home directory:

```bash
mkdir -p ~/docker/compose
mkdir -p ~/docker/appdata
mkdir -p ~/docker/compose/{core,downloads,media,minecraft,photos,documents,automation,llm}
```

This separation matters:

- `~/docker/compose` holds your compose files
- `~/docker/appdata` holds persistent config/state for containers

When things break later, you will be glad you kept those concerns separate.

---

## Decide What Lives on NAS vs Local SSD

Not all data should live in the same place.

As a general rule:

- Put **bulk media and documents** on the NAS
- Put **databases, caches, thumbnails and app configs** on the local SSD in the VM unless there is a good reason not to

That means:

- `/mnt/nas/media` for movies, TV, music, downloads
- `/mnt/nas/photos` for large photo libraries
- `/mnt/nas/documents` for archived documents
- `~/docker/appdata/...` for per-app config, databases, cache and metadata

This gives you good performance while still keeping your large data sets on resilient storage.

---

## Create a Shared Docker Network

Later, if you use a reverse proxy such as Caddy or NGINX, it is helpful for multiple containers to share a common Docker network.

Create one now:

```bash
docker network create proxy
```

You only need to do this once.

---

## Sensible Utility Packages

If you want a few useful tools on the NixOS VM itself, add them to `environment.systemPackages` in `configuration.nix`.

For example:

```nix
environment.systemPackages = with pkgs; [
  git
  curl
  vim
  htop
  ncdu
  iotop
  docker-compose
];
```

Then rebuild:

```bash
sudo nixos-rebuild switch
```

---

## Firewall Philosophy

NixOS already has a firewall framework. Docker can also manipulate firewall rules on its own.

For beginners, the simplest good default is:

- keep the host private behind your LAN
- use Tailscale for remote access
- only expose ports intentionally

Do not start by opening a giant list of ports "just in case".

Instead, each service page will mention the port it uses, and you can decide whether that service should be reachable:

- only from LAN/Tailscale
- or eventually via a reverse proxy and domain

---

## Compose File Strategy

I recommend **one compose file per logical stack**.

For example:

- `~/docker/compose/core/filebrowser.compose.yml`
- `~/docker/compose/downloads/bittorrent.compose.yml`
- `~/docker/compose/media/movies-tv.compose.yml`
- `~/docker/compose/media/jellyfin.compose.yml`

That gives you enough separation to manage services cleanly without making everything so fragmented that you hate working with it.

---

## A Few Ground Rules Before You Start Deploying Apps

- Prefer bind mounts you understand over clever abstractions you do not
- Avoid exposing admin panels publicly unless you truly need to
- Keep secrets out of compose files when possible
- Name containers clearly
- Use restart policies such as `unless-stopped`
- Do not blindly auto-update every stateful service without backups

That last point matters a lot more than people think.

---

## Next Steps

Next, we will deploy a simple but genuinely useful service so you can verify your Docker host, storage mounts and networking all work together.

Proceed to [FileBrowser](/blueprint/10-filebrowser).

---

> **Last updated:** March 2026<br>
