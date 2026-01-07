---
title: "Immich"
phase: "Phase 18"
weight: 18
---

Immich provides Google Photos-like features: backups, albums, ML tagging, and a great mobile app.

## Storage planning
Immich grows fast. Recommended:
- Photo library on NAS: `/mnt/nas/photos/immich/library`
- Appdata (DB/cache) on fast local SSD if possible

## Deployment note
Immich evolves quickly and its official Docker Compose file is the best baseline.

### Recommended approach
1. Follow Immich’s official compose file
2. Map the library folder to your NAS mount
3. Keep Postgres + Redis volumes on local SSD if you want better performance

## Mobile backup over Tailscale (safe & easy)
1. Install Immich mobile app
2. Install Tailscale on your phone
3. Connect to your tailnet
4. Set Immich server URL to your server’s Tailscale IP/name
5. Enable automatic backup

## Next
Proceed to: **[n8n](18-n8n.md)**


---
**Navigation:** ← [Music Server: Navidrome (+ Mobile Clients)](16-navidrome.md) | [Workflow Automation: n8n](18-n8n.md) →
