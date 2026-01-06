---
title: "Backup NAS + ZFS Replication"
phase: "Phase 23"
weight: 23
---

If losing your NAS data would be a big deal (photos/docs), build a backup NAS and replicate.

## 1) Build a backup NAS
- Old PC + drives
- Install TrueNAS SCALE (bare metal recommended)
- Create pool (example: `backup`)

## 2) Ensure snapshots exist on the primary NAS
On primary TrueNAS:
- Data Protection → Periodic Snapshot Tasks

## 3) Configure replication (TrueNAS → TrueNAS)
High-level steps:
1. Set up SSH between primary and backup NAS
2. TrueNAS UI → Data Protection → Replication Tasks → Add
3. Select source datasets (photos, documents, etc.)
4. Select destination datasets on backup pool
5. Schedule (nightly/hourly)
6. Test and verify snapshots on destination

## 4) Consider an offsite copy
Replication protects against disk loss, but not fire/theft.
Options:
- rotate an external drive
- encrypted cloud backup for irreplaceable data
- store a copy offsite

## Next
Proceed to: **[Extras](24-extras.md)**


---
**Navigation:** ← [Domain + Cloudflare + Caddy Reverse Proxy](22-domain-cloudflare-caddy.md) | [Extras: Monitoring, Backups, UPS, Hygiene](24-extras.md) →
