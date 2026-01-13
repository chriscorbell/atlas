---
title: "Proxmox"
phase: "Phase 3"
weight: 3
---

> **Prerequisite:** [Hardware](/blueprint/02-hardware)

Once you have your hardware on hand and ready to go, the first thing to do is install **Proxmox** on it.

<a href="https://www.proxmox.com/en/products/proxmox-virtual-environment/overview" target="_blank" rel="noopener">Proxmox Virtual Environment</a> (aka **Proxmox VE**, **PVE**, or simply **Proxmox**) is the "bare-metal" OS that you will install directly on your hardware.

It is a free and open-source virtualization platform designed to "sit in-between" your hardware and one or more virtual machines (VMs), and allows for easy management of the VMs running on your server through a web UI that is accessible from any other computer on your home network.

*"Why don't I just install Linux directly and use that instead?"*

You ***can*** if you want, and that's totally fine. But using Proxmox as a "base layer" for your server provides much more flexibility for maintenance, experimentation and learning.

This will be the first step in the software part of this journey, so once you have your hardware ready, proceed with the steps below.

---

### Step 1: Prepare installation media

On a personal computer, connect a USB flash drive with at least 4GB of capacity. We will write the installer to this USB drive and then use it to boot the Proxmox installer on your server.

> **NOTE:** Any data currently stored on this USB drive will be **destroyed** during this process. Always ensure you have any important data backed up somewhere safe.

1. Navigate <a href="https://www.proxmox.com/en/downloads/proxmox-virtual-environment" target="_blank" rel="noopener">here</a> and download the latest version of the Proxmox VE ISO installer:

![](/blueprint/03-proxmox/proxmoxve-download.png)

2. Navigate <a href="https://etcher.balena.io/" target="_blank" rel="noopener">here</a> and download Balena Etcher. This is a tool that runs on Windows, macOS and Linux that you will use to write the Proxmox VE ISO installer file to your USB flash drive:

![](/blueprint/03-proxmox/etcher-download.png)

3. Run Balena Etcher and choose "Flash from file", then select the Proxmox VE ISO installer file you downloaded.
4. Click "Select target", check the box for the USB flash drive you have connected (it will usually do this for you automatically), then click "Select 1".
> **NOTE:** **Triple-check** you have the correct disk selected, and **ONLY** that disk. You can unintentionally **destroy** important data by mistaking one disk for another, or by accidentally selecting multiple disks.
5. Click "Flash!"

Once the process is complete, close Balena Etcher, unmount/eject your USB drive, then disconnect it from your computer.

---

### Step 2: Install Proxmox

1. Connect the following to your server:
   - An ethernet cable connected to your home network (router, etc.)
   - A monitor
   - A keyboard
   - A mouse
   - The USB flash drive you flashed earlier
2. Power on your server and first go into your BIOS (usually this is achieved by repeatedly pressing the F1, F2 or Delete key when turning on the computer - this varies by manufacturer).
3. Once you land in the BIOS, look through the menus and ensure either **VT-d** (Intel) or **SVM** (AMD) is enabled, then ensure **IOMMU** is enabled if possible, and finally, disable **Secure Boot**.
   - Without **VT-d** or **SVM** enabled, virtualization **will not work at all**.
   - Enabling **IOMMU** ensures we can more easily pass through hardware devices like a GPU to a specific VM.
   - Leaving **Secure Boot** enabled can prevent some Linux distributions from booting properly.
4. Save your changes to the BIOS and reboot the server.
5. Override the boot media by accessing the boot menu after rebooting the server (usually this is achieved by repeatedly pressing the F11 key when turning on the computer, but again this varies by manufacturer), then choose to boot from the USB drive you flashed earlier.
6. After booting from the USB drive, choose "**Install Proxmox VE (Graphical)**".
7. Accept the EULA.
8. Choose the target disk to install Proxmox on. You **do not** want to select a hard drive for this. Install Proxmox to an SSD, ideally a fast NVMe drive.
   - **Optional:** If you instead want to use two NVMe drives instead of just one (for redundancy in case one of them fails):
     - Choose the first NVMe drive in the dropdown list.
     - Click "Options".
     - Change the filesystem to "ZFS (RAID1)".
     - Change "Harddisk 0" to the first NVMe drive.
     - Change "Harddisk 1" to the second NVMe drive.
     - Ensure all other "Harddisk X" choices are set to "-- do not use --".
     - Click "OK".
9. Select your country, time zone and keyboard layout, then click "Next".
10. Create an administrator password (don't forget it!) and enter your email address, then click "Next".
11. On the Network Configuration page:
    - If your server was able to automatically make a successful connection to your home network via the attached ethernet cable, "Management Interface" should already be chosen for you with a green dot next to the selected interface, leave this alone.
    - "Hostname" will default to something like "pve.home.lan" or "pve.lan", etc. If you want to customize the name of your server, change the "pve" part to something else, or instead just leave it as "pve".
    - "IP Address" should be autopopulated with whatever local IP address your router/DHCP assigned to your server. I recommend changing the last octet to something you'll remember easily (for example: instead of `10.0.0.246`, use `10.0.0.20`).
      - Ensure the IP address you are changing this to is not already in use by another device on your network. You can do this on any computer by opening a terminal and typing `ping 10.0.0.20` and then hit Enter. If you don't see any responses to your pings, that IP address is likely available for use.
    - Click "Next".
12. Review the details on the summary page, and when ready, click "Install".
13. After the installation is complete, the server will reboot. Remove the USB drive once it reboots so that you don't accidentally boot back into the Proxmox installer.
14. Once the server has completed rebooting, it should boot automatically into the new Proxmox installation you just created. On the screen, you will only just see white text on a black screen telling you to connect to the server's IP address on port 8006 (example: `https://10.0.0.20:8006`)
16. Congrats! The foundation of your server is now up and running. You can disconnect everything from the server except for power and ethernet, since from this point forward you will manage everything using your personal computer instead.

---

### Step 3: Proxmox Configuration

1. On your personal computer, open a web browser and navigate to port 8006 on your server's IP address (example: `https://10.0.0.20:8006`)
   - You will likely get a warning from your browser stating that the website is not secure. This is because the server's web interface is served over HTTPS, but only has a self-signed certificate for this connection. This is expected and is nothing to worry about. Simply proceed by clicking "Advanced", etc. (depending on what browser you are using).
2. Log into the web interface by entering the username "root", along with the password you set during the installation process.
3. The first thing you will see is a warning message stating that you do not have a valid subscription for your server. This is expected since we are using Proxmox for personal use and not in an enterprise environment. Simply ignore this message and click OK.
