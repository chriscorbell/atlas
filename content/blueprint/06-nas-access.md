---
title: "NAS Access"
phase: "Phase 6"
weight: 6
---

Your Debian Docker host should read/write storage on TrueNAS.

## Choose SMB or NFS
- **SMB**: easiest, especially if Windows clients also use the same shares
- **NFS**: great Linux permissions/performance

This page shows SMB (simple) plus NFS notes.

## Option A: SMB mounts
### 1) Install cifs-utils
```bash
sudo apt update
sudo apt install -y cifs-utils
```

### 2) Create mount points
```bash
sudo mkdir -p /mnt/nas/media
sudo mkdir -p /mnt/nas/photos
sudo mkdir -p /mnt/nas/documents
sudo mkdir -p /mnt/nas/backups
```

### 3) Create credentials file
```bash
sudo nano /etc/samba/credentials-truenas
```

```text
username=smbuser
password=YOUR_PASSWORD_HERE
domain=WORKGROUP
```

Secure it:
```bash
sudo chmod 600 /etc/samba/credentials-truenas
```

### 4) Add fstab entries
```bash
sudo nano /etc/fstab
```

Example (adjust share names + IP):
```fstab
//<TRUENAS-IP>/media      /mnt/nas/media      cifs  credentials=/etc/samba/credentials-truenas,uid=1000,gid=1000,iocharset=utf8,file_mode=0775,dir_mode=0775,nofail  0  0
//<TRUENAS-IP>/photos     /mnt/nas/photos     cifs  credentials=/etc/samba/credentials-truenas,uid=1000,gid=1000,iocharset=utf8,file_mode=0775,dir_mode=0775,nofail  0  0
//<TRUENAS-IP>/documents  /mnt/nas/documents  cifs  credentials=/etc/samba/credentials-truenas,uid=1000,gid=1000,iocharset=utf8,file_mode=0770,dir_mode=0770,nofail  0  0
//<TRUENAS-IP>/backups    /mnt/nas/backups    cifs  credentials=/etc/samba/credentials-truenas,uid=1000,gid=1000,iocharset=utf8,file_mode=0770,dir_mode=0770,nofail  0  0
```

Mount:
```bash
sudo mount -a
```
Verify:
```bash
df -h | grep /mnt/nas
```

## Option B: NFS notes
If you prefer NFS:
1. Enable NFS service on TrueNAS
2. Export datasets
3. Mount with `nfs4` in `/etc/fstab`

## Next
Proceed to: **[Tailscale](07-tailscale.md)**


---
**Navigation:** ← [Debian VM on Proxmox (GPU/iGPU Passthrough + SSH)](05-debian-vm-gpu-ssh.md) | [Tailscale Remote Access](07-tailscale.md) →
