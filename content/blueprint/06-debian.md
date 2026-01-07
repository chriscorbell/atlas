---
title: "Debian"
phase: "Phase 6"
weight: 6
---

This Debian VM is your “app host” for Docker.

## 1) Create the Debian VM
Suggested starting resources:
- vCPU: 4–12
- RAM: 16–32 GB (more if LLMs)
- Disk: 100–300 GB on fast storage

Proxmox settings (recommended):
- Machine: `q35`
- BIOS: OVMF (UEFI)
- CPU type: host
- Disk: VirtIO SCSI
- Network: VirtIO

Install Debian from ISO normally.

## 2) SSH crash course
### Install SSH server
```bash
sudo apt update
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
```

### Find the VM IP
```bash
ip a
```

### Connect from your computer
```bash
ssh youruser@<debian-ip>
```

### Use SSH keys (recommended)
On your computer:
```bash
ssh-keygen -t ed25519
ssh-copy-id youruser@<debian-ip>
```

## 3) GPU/iGPU passthrough overview
Two common goals:
- **Jellyfin hardware transcoding** (Intel Quick Sync or NVIDIA NVENC)
- **Ollama acceleration** (typically NVIDIA)

If you get stuck with iGPU passthrough, consider:
- using an NVIDIA GPU passthrough, or
- running Jellyfin in an LXC with `/dev/dri` (outside the scope of this VM-only guide)

## 4) Enable IOMMU on Proxmox (required)
### BIOS settings
Enable:
- Intel VT-d / AMD-Vi (IOMMU)
- Above 4G decoding (often required for GPUs)

### Proxmox GRUB settings
Edit:
```bash
nano /etc/default/grub
```

Intel:
```text
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"
```

AMD:
```text
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt"
```

Apply + reboot:
```bash
update-grub
reboot
```

### Load VFIO modules
Create:
```bash
nano /etc/modules-load.d/vfio.conf
```
Add:
```text
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

Reboot and confirm:
```bash
dmesg | grep -e IOMMU -e DMAR
```

## 5) NVIDIA GPU passthrough (most common)
### Identify GPU PCI devices
On Proxmox:
```bash
lspci -nn | grep -i nvidia
```
You’ll typically see:
- GPU function (e.g., `01:00.0`)
- Audio function (e.g., `01:00.1`)

### Add GPU to the Debian VM
Proxmox UI:
- Debian VM → Hardware → Add → PCI Device
- Add the GPU and its audio function
- Check “PCI-Express” and “All Functions” when appropriate

### Install NVIDIA drivers in Debian
Inside Debian:
```bash
sudo apt update
sudo apt install -y nvidia-driver
sudo reboot
```
Verify:
```bash
nvidia-smi
```

## 6) Intel Quick Sync (VAAPI) notes
If Debian has access to `/dev/dri`, install:
```bash
sudo apt install -y vainfo intel-media-va-driver
vainfo
```

## Next
Proceed to: **[NAS Access from Debian](06-nas-mounts.md)**


---
**Navigation:** ← [Home Assistant OS VM on Proxmox (Backups to NAS)](04-haos-vm.md) | [NAS Access from Debian (SMB/NFS Mounts)](06-nas-mounts.md) →
