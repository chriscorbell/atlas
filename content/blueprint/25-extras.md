---
title: "Extras"
phase: "Phase 25"
weight: 25
---

> **Prerequisite:** [Backups](/blueprint/24-backup)

By this point, you have the core of a real self-hosting environment:

- a hypervisor
- storage
- an app host
- remote access
- services
- backups

This final page is a grab bag of improvements that are not strictly required to get started, but do make the system much more maintainable over time.

---

## UPS and Graceful Shutdown

If your server matters, a UPS is not overkill.

A small power flicker can mean:

- filesystem corruption
- incomplete writes
- abrupt VM shutdowns

At minimum, consider a UPS for:

- the server itself
- your network gear if practical

Then configure graceful shutdown behavior in Proxmox and/or TrueNAS as appropriate.

---

## Monitoring

Do not wait until something is broken to realize you wish you had visibility.

Some practical additions:

- **Uptime Kuma** for endpoint/service monitoring
- **Netdata** for quick host visibility
- **Grafana + Prometheus** if you want a deeper observability stack

You do not need to build a fake enterprise NOC for a home server, but you should know when something important is down.

---

## Update Discipline

A reasonable maintenance cadence looks something like this:

- Proxmox: periodically, not constantly
- TrueNAS: deliberately, with attention to release notes
- containers: regularly, but not blindly
- major application upgrades: after backups and preferably after reading changelogs

The correct update strategy is not "never update" and it is not "YOLO latest on everything every night".

It is controlled change.

---

## Security Hygiene

A few boring habits go a long way:

- keep Proxmox and TrueNAS private
- use strong unique passwords
- enable MFA where available
- keep secrets out of tracked config files
- delete services you no longer use
- expose less, not more

A home server does not need enterprise theater, but it does need basic discipline.

---

## Documentation

Your future self is another operator.

Write down:

- IP addresses or DHCP reservations
- what each VM is for
- where your important datasets live
- how backups are scheduled
- how to recover from common failures

It does not need to be beautiful. It just needs to exist.

---

## Future Directions

Once the basics are stable, you can keep going:

- SSO with Authentik or another identity provider
- VLANs for IoT isolation
- Ansible or other automation for repeatable host setup
- central logging
- dashboards
- more rigorous secrets management

But do not confuse "more components" with "better system".

A smaller stack you understand is worth more than a larger one you cannot maintain.

---

## Closing Thought

The point of all this is not to perfectly recreate a cloud provider in your house.

The point is to own your tools, your data and your workflow to a degree that modern consumer platforms increasingly do not allow.

You do not need to self-host everything. You do not need to become a full-time infrastructure engineer. You just need enough understanding and enough care to build something you can trust because you actually control it.

That is the whole idea.

---

> **Last updated:** March 2026<br>
