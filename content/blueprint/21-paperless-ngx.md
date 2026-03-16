---
title: "Paperless-ngx"
phase: "Phase 21"
weight: 21
---

> **Prerequisite:** [Local LLMs](/blueprint/20-llms)

**Paperless-ngx** turns a pile of PDFs, scans and receipts into a searchable document archive.

If you care about actually owning your records, this is one of the highest-value services in the whole stack.

Photos and media are fun. Documents are where the consequences of disorganization get much more real.

---

## Plan the Storage First

As with Immich, you want to separate:

- bulky archived files
- fast-changing application state

A sensible layout is:

- NAS-backed consume/inbox: `/mnt/nas/documents/inbox`
- NAS-backed archive/media path: `/mnt/nas/documents/archive`
- local appdata and database: `~/docker/appdata/paperless-ngx`

That gives you capacity where you need it and performance where it matters.

---

## Use the Official Compose Example

Paperless-ngx is another project where the official compose example is a better baseline than baking a static copy into this guide and pretending it will never change.

Start here:

<a href="https://docs.paperless-ngx.com/setup/#docker" target="_blank" rel="noopener">https://docs.paperless-ngx.com/setup/#docker</a>

Adapt the paths to match your environment.

Specifically:

- map the consume folder to your inbox path
- map the media/archive location to your NAS-backed documents storage
- keep the database on local SSD-backed storage if possible

---

## Suggested Local Prep

Create the key directories up front:

```bash
mkdir -p ~/docker/appdata/paperless-ngx
mkdir -p ~/docker/compose/documents
mkdir -p /mnt/nas/documents/inbox
mkdir -p /mnt/nas/documents/archive
```

Then adapt the official compose example around that.

---

## Why This App Is Worth the Trouble

Paperless-ngx is one of those tools that becomes more valuable over time.

At first, it is just:

- "nice, my PDFs are searchable"

Later, it becomes:

- tax records
- receipts
- manuals
- warranties
- medical paperwork
- contracts

In other words, data you really do not want to lose or misplace.

---

## Test the Workflow

After deployment:

1. create your account
2. configure OCR language settings
3. drop a test PDF into the consume folder
4. verify it is imported and searchable

Do not just stop once the login page works. The ingestion path is the real product.

---

## Next Steps

Next, we will talk about container updates and why "automatic" is not always the same thing as "good".

Proceed to [Watchtower](/blueprint/22-watchtower).

---

> **Last updated:** March 2026<br>
