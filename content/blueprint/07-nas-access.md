---
title: "NAS Access"
phase: "Phase 7"
weight: 7
---

> **Prerequisite:** [NixOS](/blueprint/06-nixos)

Now that your NixOS VM exists, the next step is giving it access to your storage.

If you set up TrueNAS earlier, this is where everything starts to come together: your apps can stay in one VM while their data lives on the NAS.

There are two common ways to do that:

- **SMB**: easiest to understand, especially if Windows computers also use the same shares
- **NFS**: often preferred for Linux-to-Linux access and cleaner permissions behavior

For this guide, I recommend **SMB first** because it is easier to reason about when you also want desktop access to the same shares.

---

## Plan Your Shares

Before mounting anything in NixOS, decide what top-level shares or datasets you actually want to expose.

A practical layout looks something like this:

- `media`
- `photos`
- `documents`
- `backups`

On the NixOS side, we will mount those under:

- `/mnt/nas/media`
- `/mnt/nas/photos`
- `/mnt/nas/documents`
- `/mnt/nas/backups`

If you used different share names in TrueNAS, that is fine. Just stay consistent.

---

## Create a Dedicated SMB User in TrueNAS

Before touching NixOS, create a user in TrueNAS specifically for SMB access.

Do **not** use the main administrator account for routine share mounts from your app host.

Give that user access only to the datasets and shares it actually needs.

This keeps the permissions model simpler and reduces the blast radius if credentials are ever exposed.

---

## Create the Mount Points in NixOS

On the NixOS VM:

```bash
sudo mkdir -p /mnt/nas/media
sudo mkdir -p /mnt/nas/photos
sudo mkdir -p /mnt/nas/documents
sudo mkdir -p /mnt/nas/backups
```

---

## Store SMB Credentials Outside Your Nix Config

You do **not** want to hard-code SMB usernames and passwords directly into `configuration.nix`, especially if you keep that file in Git later.

Instead, create a root-only credentials file:

```bash
sudo mkdir -p /etc/samba
sudo nano /etc/samba/truenas.cred
```

Example contents:

```text
username=truenas-smb
password=YOUR_PASSWORD_HERE
```

Then lock down the permissions:

```bash
sudo chmod 600 /etc/samba/truenas.cred
```

---

## Add SMB Mounts to `configuration.nix`

Open your NixOS configuration:

```bash
sudo nano /etc/nixos/configuration.nix
```

Add the following, adjusting the IP address, share names, and UID/GID to match your setup:

```nix
{
  boot.supportedFilesystems = [ "cifs" ];

  fileSystems."/mnt/nas/media" = {
    device = "//10.0.0.109/media";
    fsType = "cifs";
    options = [
      "credentials=/etc/samba/truenas.cred"
      "uid=1000"
      "gid=1000"
      "file_mode=0775"
      "dir_mode=0775"
      "x-systemd.automount"
      "noauto"
      "nofail"
      "_netdev"
    ];
  };

  fileSystems."/mnt/nas/photos" = {
    device = "//10.0.0.109/photos";
    fsType = "cifs";
    options = [
      "credentials=/etc/samba/truenas.cred"
      "uid=1000"
      "gid=1000"
      "file_mode=0775"
      "dir_mode=0775"
      "x-systemd.automount"
      "noauto"
      "nofail"
      "_netdev"
    ];
  };

  fileSystems."/mnt/nas/documents" = {
    device = "//10.0.0.109/documents";
    fsType = "cifs";
    options = [
      "credentials=/etc/samba/truenas.cred"
      "uid=1000"
      "gid=1000"
      "file_mode=0770"
      "dir_mode=0770"
      "x-systemd.automount"
      "noauto"
      "nofail"
      "_netdev"
    ];
  };

  fileSystems."/mnt/nas/backups" = {
    device = "//10.0.0.109/backups";
    fsType = "cifs";
    options = [
      "credentials=/etc/samba/truenas.cred"
      "uid=1000"
      "gid=1000"
      "file_mode=0770"
      "dir_mode=0770"
      "x-systemd.automount"
      "noauto"
      "nofail"
      "_netdev"
    ];
  };
}
```

Then apply the configuration:

```bash
sudo nixos-rebuild switch
```

The `x-systemd.automount` option makes the shares mount on demand instead of blocking boot if the NAS is temporarily unavailable.

---

## Verify the Mounts

Touch each path once so systemd mounts it:

```bash
ls /mnt/nas/media
ls /mnt/nas/photos
ls /mnt/nas/documents
ls /mnt/nas/backups
```

Then confirm they are mounted:

```bash
mount | grep /mnt/nas
```

If something does not mount:

- Confirm the TrueNAS IP address is correct
- Confirm the SMB share name matches exactly
- Confirm the user has permission to the dataset and share
- Check logs with `journalctl -xe`

---

## What About NFS?

You can absolutely use NFS instead if you prefer.

That is often a good choice when:

- only Linux systems need access
- you want cleaner Unix-style permissions
- you are comfortable managing exports on the TrueNAS side

If you go that route, add `boot.supportedFilesystems = [ "nfs" ];` and use `fsType = "nfs"` with the appropriate export path.

For many home setups, though, SMB is perfectly fine and much easier to share across mixed devices.

---

## If You Skipped TrueNAS

If you do not have a NAS yet, you can still continue with the rest of the guide.

In that case:

- store container data locally on the NixOS VM for now
- skip the NAS mount configuration
- come back to this page later once you add TrueNAS or another storage server

---

## Next Steps

Next, we will set up secure remote access so you can reach your self-hosted services from outside your home without exposing everything directly to the public internet.

Proceed to [Tailscale](/blueprint/08-tailscale).

---

> **Last updated:** March 2026<br>
