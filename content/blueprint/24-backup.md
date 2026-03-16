---
title: "Backups"
phase: "Phase 24"
weight: 24
---

> **Prerequisite:** [Domain](/blueprint/23-domain)

Backups are where self-hosting stops being a hobby aesthetic and becomes an actual responsibility.

RAID is not a backup. ZFS is not a backup. Snapshots are not a backup by themselves. "I have two copies on the same machine" is not a backup strategy either.

What you want is recovery from more than one kind of failure.

---

## What Needs to Be Protected?

Not all data is equally important.

In this stack, the most important categories are usually:

- irreplaceable photos and videos
- documents
- Home Assistant backups
- critical application data and configs
- media libraries you do not want to rebuild from scratch

You do not need the same recovery objective for everything, but you do need to decide what matters most before disaster makes the decision for you.

---

## TrueNAS Snapshots on the Primary NAS

On your primary TrueNAS system, enable periodic snapshot tasks for the datasets that matter.

Snapshots are useful because they help with:

- accidental deletion
- bad application behavior
- rollback after mistakes

They are not a full backup on their own, but they are an essential layer.

Create snapshot schedules for datasets such as:

- photos
- documents
- media
- backups

Use retention that makes sense for the data and the amount of storage you have available.

---

## Back Up Proxmox Guests

Do not forget the VM layer.

Proxmox can create scheduled backups of your VMs, which is particularly useful for:

- the NixOS app host
- the Home Assistant VM
- any other appliance VMs you care about

Store those backups somewhere other than the same local disk Proxmox boots from.

If possible, put them on TrueNAS or another storage target with enough space and retention.

---

## TrueNAS-to-TrueNAS Replication

If your data is important enough, build or designate a second NAS.

It does not need to be fancy. An older box with enough disks is still far better than having no second copy at all.

The high-level flow is:

1. create periodic snapshots on the primary TrueNAS
2. set up SSH connectivity to the backup TrueNAS
3. create replication tasks from the primary datasets to the backup system
4. verify that replicated snapshots actually exist on the destination

This protects you against:

- pool failure
- host failure
- many user mistakes

It does **not** protect you against everything.

---

## Home Assistant Backups

HAOS should have its own backup flow as well.

At minimum:

- enable automatic Home Assistant backups
- store them somewhere outside the VM if possible

A TrueNAS SMB share is a good target for those backups if you followed the earlier HAOS section.

---

## Appdata Backups for the NixOS Host

Many containers store important state in `~/docker/appdata`.

That path deserves its own backup plan.

At minimum, ensure you can recover:

- compose files
- environment files and secrets you cannot easily recreate
- container config directories
- databases for critical apps

This can be done through:

- Proxmox VM backups
- filesystem snapshots inside the VM
- rsync/restic/borg style backups
- or a mix of the above

Pick something you will actually maintain.

---

## Offsite Still Matters

If the only copies of your data are in your house, then:

- fire
- theft
- electrical damage
- water damage

can still wipe you out.

For the data you truly care about, add an offsite copy.

That could be:

- a second NAS at another location
- rotated external drives
- encrypted cloud backup for your most important datasets

The best backup is the one that exists before you need it.

---

## Test Recovery

A backup you have never restored from is just an optimistic theory.

Periodically test:

- restoring a file from a snapshot
- restoring a VM backup
- recovering a document archive item
- recovering a Home Assistant backup

If restore testing is absent, your backup plan is incomplete.

---

## Next Steps

The final page is a collection of practical improvements that make the whole environment more reliable and less annoying to maintain.

Proceed to [Extras](/blueprint/25-extras).

---

> **Last updated:** March 2026<br>
