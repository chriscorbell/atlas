---
title: "Proxmox"
phase: "Phase 2"
weight: 2
---

Proxmox VE will be your bare-metal hypervisor. You’ll manage VMs (TrueNAS, Home Assistant, Debian) from its web UI.

## 1) Prepare install media
1. Download the latest Proxmox VE ISO
2. Write the ISO to a USB drive (Rufus/Balena Etcher)
3. Boot your server from the USB drive

## 2) Install Proxmox
1. Choose **Install Proxmox VE**
2. Select the target disk (SSD/NVMe recommended)
3. Set timezone/keyboard
4. Set a strong root password + email
5. Network:
   - Prefer a static IP or DHCP reservation
   - Set a hostname like `pve`

## 3) First login
From another computer on your LAN:
- Open: `https://<proxmox-ip>:8006`
- Login as `root`

## 4) Post-install basics
### Update packages
In UI: **Node → Updates → Refresh → Upgrade**

Or in shell:
```bash
apt update && apt -y full-upgrade
```

### Create a non-root admin user (recommended)
- Datacenter → Permissions → Users → Add
- Assign an Administrator role

### Upload ISOs
- `local` → ISO Images → Upload

## Next
Proceed to: **[TrueNAS SCALE VM](03-truenas-vm.md)**


---
**Navigation:** ← [Hardware Selection & Recommendations](01-hardware.md) | [TrueNAS SCALE VM on Proxmox (ZFS + SMB)](03-truenas-vm.md) →
