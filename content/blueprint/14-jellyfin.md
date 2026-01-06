---
title: "Jellyfin"
phase: "Phase 14"
weight: 14
---

Jellyfin streams your media library and can transcode using GPU/iGPU acceleration.

## 1) Prepare media folders
Suggested NAS folders:
- `/mnt/nas/media/movies`
- `/mnt/nas/media/tv`
- `/mnt/nas/media/music`

## 2) Docker Compose
Create: `~/docker/compose/media/jellyfin.compose.yml`

```yaml
services:
  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - ~/docker/appdata/jellyfin:/config
      - /mnt/nas/media/movies:/data/movies
      - /mnt/nas/media/tv:/data/tv
      - /mnt/nas/media/music:/data/music
    ports:
      - "8096:8096"
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/media/jellyfin.compose.yml up -d
```

Open:
- `http://<debian-ip>:8096`

## 3) Enable hardware acceleration
### NVIDIA
If your Debian VM has an NVIDIA GPU and you installed the NVIDIA container runtime, configure Jellyfin hardware acceleration in:
- Dashboard → Playback → Transcoding

### Intel VAAPI/QSV
If `/dev/dri` is available in the container, add:
```yaml
    devices:
      - /dev/dri:/dev/dri
```
Then enable VAAPI/QSV in Jellyfin.

## Next
Proceed to: **[slskd + Lidarr](15-slskd-lidarr.md)**


---
**Navigation:** ← [The *arr Stack: Sonarr + Radarr (+ Jellyseerr)](13-arr-stack.md) | [Music Acquisition: slskd + Lidarr](15-slskd-lidarr.md) →
