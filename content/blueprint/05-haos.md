---
title: "HAOS"
phase: "Phase 5"
weight: 5
---

Home Assistant OS (HAOS) runs well in a Proxmox VM and keeps your smart home isolated from your Docker host.

## 1) Create the HAOS VM
### Download HAOS image
Get the **KVM/Proxmox** disk image (QCOW2) from Home Assistant releases.

### Create VM shell
- Name: `homeassistant`
- CPU: 2 cores
- RAM: 4–8 GB
- Disk: create minimal disk or none (we’ll import)
- Network: VirtIO

### Import the HAOS disk
On Proxmox host:
```bash
qm importdisk <VMID> /path/to/haos.qcow2 local-lvm
```
Attach imported disk:
- VM → Hardware → Add → Existing Disk
- VM → Options → Boot Order → set imported disk first

## 2) First boot + onboarding
Start VM and access:
- `http://<ha-ip>:8123`

## 3) Optional: USB passthrough (Zigbee/Z-Wave)
- VM → Hardware → Add → USB Device

## 4) Automatic HA backups to NAS
Goal: backups live **outside** the HA VM disk.

### Create a dataset
Example: `tank/backups/homeassistant`
Share via SMB or NFS.

### Use a backup add-on
Common approach:
- Install a backup add-on (e.g., Samba Backup)
- Configure it to store backups on your NAS share

### Verify backups
- Ensure files appear in the NAS dataset
- Test restoring a backup at least once (practice is priceless)

## Next
Proceed to: **[Debian VM + GPU/iGPU + SSH](05-debian-vm-gpu-ssh.md)**


---
**Navigation:** ← [TrueNAS SCALE VM on Proxmox (ZFS + SMB)](03-truenas-vm.md) | [Debian VM on Proxmox (GPU/iGPU Passthrough + SSH)](05-debian-vm-gpu-ssh.md) →
