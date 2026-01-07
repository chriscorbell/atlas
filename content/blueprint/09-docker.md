---
title: "Docker"
phase: "Phase 9"
weight: 9
---

This page sets up Docker on your Debian VM and a clean folder layout for all your stacks.

## 1) Install base utilities
```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg git htop iotop ncdu ufw fail2ban
```

## 2) Install Docker Engine + Docker Compose
Use Docker’s official Debian instructions (recommended). After installing:
```bash
docker --version
docker compose version
```

## 3) Allow your user to run Docker (optional)
```bash
sudo usermod -aG docker $USER
newgrp docker
```

## 4) Create folder layout
```bash
mkdir -p ~/docker/compose
mkdir -p ~/docker/appdata
mkdir -p ~/docker/compose/{core,media,downloads,photos,docs,automation,llm,minecraft}
```

## 5) Create a shared network for reverse proxy
```bash
docker network create proxy
```

## 6) Basic firewall (UFW)
If you primarily access services via LAN/Tailscale:
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable
sudo ufw status
```

## Next
Proceed to: **[FileBrowser](09-filebrowser.md)**


---
**Navigation:** ← [Tailscale Remote Access](07-tailscale.md) | [File Management: FileBrowser](09-filebrowser.md) →
