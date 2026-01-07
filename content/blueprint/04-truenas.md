---
title: "TrueNAS"
phase: "Phase 4"
weight: 4
---

> **Important:** Virtualizing a NAS is totally doable, but do it correctly.
> - Best: pass through an entire **HBA/controller** to TrueNAS.
> - Acceptable: pass through **whole disks** consistently.
> - Avoid: building TrueNAS pools on top of Proxmox virtual disks.

## 1) Create the TrueNAS VM
### Upload the TrueNAS ISO
- Proxmox → `local` → ISO Images → Upload

### Create VM
- Name: `truenas`
- OS: Linux
- BIOS: OVMF (UEFI) recommended
- CPU: 2–4 cores
- RAM: 8–16 GB
- Boot disk: 32–64 GB on SSD/NVMe
- NIC: VirtIO

## 2) Add storage to TrueNAS
### Option A (best): HBA passthrough
- Install an HBA (LSI IT mode)
- Enable IOMMU in Proxmox (see Debian GPU page for IOMMU steps)
- Add PCI device → select HBA

### Option B: passthrough whole disks
On Proxmox host:
```bash
ls -l /dev/disk/by-id/
```
Use Proxmox UI:
- VM → Hardware → Add → Hard Disk → **Use physical disk**

## 3) Install TrueNAS
Boot the VM and run the installer.
Then access the UI:
- `http://<truenas-ip>`

## 4) Create a ZFS pool
TrueNAS UI:
1. Storage → Pools → Add
2. Select disks
3. Choose layout (Mirror/RAIDZ1/RAIDZ2)
4. Name: `tank`

## 5) Create datasets (recommended)
Suggested datasets:
- `tank/media` (movies/tv/music)
- `tank/photos` (Immich library)
- `tank/documents` (Paperless)
- `tank/appdata` (container configs; optional)
- `tank/backups` (HA + Proxmox backups)

## 6) Configure snapshots
Data Protection → Periodic Snapshot Tasks
- Hourly: keep 24
- Daily: keep 30
- Weekly: keep 8

## 7) SMB share (Windows/macOS clients)
### Create an SMB user
Credentials → Local Users → Add
- user: `smbuser`
- strong password

### Enable SMB service
System Settings → Services → SMB → Start + Enable

### Create SMB shares
Sharing → Windows (SMB) Shares → Add
Example:
- Path: `/mnt/tank/media`
- Name: `media`

### Connect from clients
- Windows: `\<truenas-ip>\media`
- macOS: `smb://<truenas-ip>/media`

## Next
Proceed to: **[Home Assistant OS VM](04-haos-vm.md)**


---
**Navigation:** ← [Installing Proxmox VE (Bare Metal)](02-proxmox-install.md) | [Home Assistant OS VM on Proxmox (Backups to NAS)](04-haos-vm.md) →
