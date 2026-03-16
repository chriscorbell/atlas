---
title: "NixOS"
phase: "Phase 6"
weight: 6
---

> **Prerequisite:** [HAOS](/blueprint/05-haos)

Now that Proxmox is up and running and your optional appliance VM(s) are in place, it is time to create the VM that will run the majority of your applications.

That VM will be **NixOS**.

NixOS is a Linux distribution built around declarative configuration. Instead of manually installing packages and hoping you remember what changed six months from now, you describe the system in configuration files and rebuild it. That makes it an excellent long-term Docker host because your base OS setup becomes easier to reason about, document and recover.

This page covers creating a **NixOS VM on Proxmox** and configuring it as your main Docker host.

> **NOTE:** If you skipped TrueNAS because you do not have multiple HDDs yet, that is fine. The NixOS VM still works perfectly well on its own and you can add NAS-backed storage later.

---

## Download and Upload the ISO

First, download the latest graphical NixOS installer ISO from the official download page:

<a href="https://nixos.org/download/" target="_blank" rel="noopener">https://nixos.org/download/</a>

Once downloaded, go to your Proxmox web UI and upload it the same way you uploaded the TrueNAS ISO:

- Under **Datacenter** > **(your Proxmox node)** > **local**
- Click **ISO Images**
- Click **Upload**
- Choose the NixOS ISO file

---

## Create the NixOS VM

In the top-right corner of the Proxmox web UI, click **Create VM**.

Use the following settings as a solid starting point:

### General

- Name: `nixos` (or whatever you prefer)
- Enable **Start at boot**

### OS

- ISO image: choose the NixOS ISO you uploaded

### System

- Machine: `q35`
- BIOS: `OVMF (UEFI)`
- EFI Storage: `local-lvm`
- Disable **Pre-Enroll Keys**

### Disks

- Bus/Device: `VirtIO SCSI`
- Disk size: `100GB` minimum

If you plan to run a lot of containers, store a large local photo cache, or experiment with local AI models, giving the VM `200GB` to `300GB` up front is reasonable.

### CPU

- Type: `host`
- Cores: start with `4`

If you have a larger CPU and expect to run many apps at once, `6` to `12` cores is a comfortable range.

### Memory

- Start with at least `8192` MiB (8GB)
- `16384` MiB (16GB) is a better default if you can spare it
- Disable **Ballooning Device**

### Network

- Model: `VirtIO (paravirtualized)`
- Bridge: leave it on your default bridge

Click **Finish** once complete.

---

## Install NixOS

Open the VM's **Console** and start the VM.

The graphical installer is straightforward, but there are a few choices worth calling out:

- Use the entire virtual disk unless you have a specific partitioning scheme in mind
- Set a hostname you will remember easily, such as `nixbox` or `docker`
- Create a normal user account for yourself
- Set a strong root password and user password
- Enable **OpenSSH** during setup if the installer offers it

Once the installation completes, shut the VM down if prompted, remove the ISO from the VM's virtual CD/DVD drive, then boot into the installed system.

---

## First Boot Checks

After the VM boots successfully, log in either through the console or over SSH.

Check the VM's IP address:

```bash
ip addr
```

I recommend setting a **DHCP reservation on your router** for this VM rather than hard-coding a static IP inside NixOS. That keeps the VM easy to reinstall later without having to remember custom network syntax in the OS configuration.

Once you know the address, test SSH access from your main computer:

```bash
ssh <your-username>@<nixos-ip>
```

If you do not want to use passwords over SSH long term, create a key on your personal computer and copy it over:

```bash
ssh-keygen -t ed25519
ssh-copy-id <your-username>@<nixos-ip>
```

---

## Configure NixOS as a Docker Host

Unlike most Linux distributions, the correct place to make persistent changes in NixOS is your system configuration.

Open `/etc/nixos/configuration.nix` in your editor of choice:

```bash
sudo nano /etc/nixos/configuration.nix
```

You do not need to replace the entire file. Just ensure you have the equivalent of the options below somewhere in it, adjusting the username and SSH key for your setup:

```nix
{ config, pkgs, ... }:

{
  networking.hostName = "nixbox";

  services.openssh.enable = true;

  users.users.youruser = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ];
    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAA..."
    ];
  };

  environment.systemPackages = with pkgs; [
    git
    curl
    vim
    htop
    docker-compose
  ];

  virtualisation.docker.enable = true;
}
```

Then apply the configuration:

```bash
sudo nixos-rebuild switch
```

After the rebuild finishes, either log out and back in again or reboot so your `docker` group membership applies cleanly.

Verify Docker is working:

```bash
docker version
docker compose version
```

> **NOTE:** On some NixOS setups, you may have `docker compose`; on others you may rely on the standalone `docker-compose` package. This guide uses `docker compose`, but the commands are otherwise the same.

---

## Optional: Prepare for GPU Passthrough

If you know you want hardware acceleration later for **Jellyfin** or **local LLMs**, this is the point where you should decide whether the NixOS VM will receive a GPU or iGPU via passthrough.

That topic gets hardware-specific very quickly, so this guide will keep the baseline simple:

- If you do not need GPU acceleration yet, skip it for now
- If you do, add the PCI device to this VM in Proxmox before you start building lots of services on top of it
- NVIDIA passthrough is usually the simplest route for LLM workloads
- Intel iGPU passthrough can work well for Jellyfin, but consumer motherboard behavior varies

We will revisit the software side of GPU support later when we get to the Jellyfin and local LLM sections.

---

## Why NixOS Here?

At first glance, NixOS can seem like an odd choice if all you want is "a VM that runs Docker". But for a self-hosting setup, it has some real advantages:

- Your base OS is documented in configuration instead of scattered across shell history
- Rebuilds are reproducible
- Rollbacks are much easier than on a typical mutable Linux installation
- Reinstalling the VM later is less painful because you are not starting from scratch conceptually

You do not need to become a Nix expert overnight. For this guide, the goal is simply to use NixOS as a stable, understandable host for your containers.

---

## Next Steps

Next, we will connect this NixOS VM to your storage so your applications can read and write data on the NAS cleanly.

Proceed to [NAS Access](/blueprint/07-nas-access).

---

> **Last updated:** March 2026<br>
