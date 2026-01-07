---
title: "Extras"
phase: "Phase 25"
weight: 25
---
#### Monitoring, Backups, UPS, Hygiene

This page is a checklist of improvements that make your server more reliable.

#### 1) UPS + graceful shutdown
A UPS prevents corruption during power flickers.
- Configure shutdown behavior in TrueNAS or Proxmox

#### 2) Proxmox backups
Schedule VM backups to NAS:
- Store in `tank/backups/proxmox`
- Keep daily + weekly retention

#### 3) Monitoring (optional, recommended)
Consider adding:
- Uptime Kuma (service monitoring)
- Netdata or Grafana/Prometheus (resource graphs)

#### 4) Update strategy
- Update Proxmox monthly (not daily)
- Update containers weekly (or selectively with Watchtower)
- Snapshot before big changes

#### 5) Security hygiene
- Keep Proxmox/TrueNAS UIs private (LAN/Tailscale)
- Enable 2FA where available
- Use strong passwords, unique per service
- Store secrets in `.env` files

#### 6) Next steps
If you want, extend the guide with:
- SSO (Authentik)
- central logging (Loki)
- VLANs for IoT isolation
- IaC automation (Ansible)


---
**Navigation:** ← [Backup NAS + ZFS Replication](23-backup-nas-replication.md)
