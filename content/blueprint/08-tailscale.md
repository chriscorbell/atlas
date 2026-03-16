---
title: "Tailscale"
phase: "Phase 8"
weight: 8
---

> **Prerequisite:** [NAS Access](/blueprint/07-nas-access)

Remote access is where a lot of beginners get into trouble.

The traditional approach is to start forwarding ports through your router and exposing services directly to the internet. That *can* be done safely, but it adds complexity and raises the stakes immediately.

For most home self-hosting setups, I recommend starting with **Tailscale** instead.

Tailscale gives you a private encrypted network between your devices. That means you can access your server from your phone or laptop while away from home without punching holes in your firewall for every service.

---

## Why Start With Tailscale?

Because it solves the problem most people actually have:

- "I want to access my server remotely"

without forcing you to immediately solve:

- public DNS
- TLS certificates
- reverse proxying
- port forwarding
- bot traffic
- brute-force protection

Those can come later if you truly need public-facing services.

---

## Enable Tailscale in NixOS

On NixOS, Tailscale is best enabled declaratively.

Open your system config:

```bash
sudo nano /etc/nixos/configuration.nix
```

Ensure you have something like this:

```nix
{ config, ... }:

{
  services.tailscale.enable = true;

  networking.firewall = {
    enable = true;
    trustedInterfaces = [ "tailscale0" ];
    allowedUDPPorts = [ config.services.tailscale.port ];
  };
}
```

Apply the change:

```bash
sudo nixos-rebuild switch
```

Then bring the machine into your tailnet:

```bash
sudo tailscale up
```

Tailscale will output a login URL. Open it in your browser, authenticate, and approve the machine.

---

## Install Tailscale on Your Other Devices

Install Tailscale on the devices you actually use:

- your main desktop or laptop
- your phone
- any tablet you use for media or home management

Log into the same Tailscale account on each device.

Once that is done, you should be able to access your NixOS VM by its Tailscale IP address from anywhere.

---

## Enable MagicDNS

In the Tailscale admin console, enable **MagicDNS**.

That lets you access machines by name instead of memorizing Tailnet IPs.

For example, instead of:

```text
http://100.x.y.z:8096
```

you may be able to use something like:

```text
http://nixbox:8096
```

or your full tailnet hostname.

That makes daily use much less annoying.

---

## What Should Stay Private?

For this guide, my recommendation is:

- Keep **Proxmox** private
- Keep **TrueNAS** private
- Keep **Home Assistant** private unless you have a specific reason not to
- Keep most admin UIs private

Access them over:

- your LAN at home
- or Tailscale when away

This "private by default" model is both safer and simpler.

---

## Optional: Advertise Your LAN as a Subnet Route

If you want a single Tailscale-connected machine to give you access to the rest of your home network, you can have the NixOS VM advertise your LAN as a subnet router.

For example:

```bash
sudo tailscale up --advertise-routes=10.0.0.0/24
```

Then approve that route in the Tailscale admin console.

This is optional. Do not do it just because it sounds advanced.

Only enable it if you actually want remote access to non-Tailscale devices on your home network.

---

## Test It

Before moving on, verify that Tailscale is genuinely useful:

- disconnect your phone from Wi-Fi
- connect your phone to Tailscale
- open one of your local services over the Tailscale address

If that works, you have already removed a lot of pressure to expose things publicly.

---

## Next Steps

Next, we will finish the foundation of the app host by setting up Docker cleanly and establishing a directory layout that the rest of the guide will build on.

Proceed to [Docker](/blueprint/09-docker).

---

> **Last updated:** March 2026<br>
