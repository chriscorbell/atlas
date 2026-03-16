---
title: "Local LLMs"
phase: "Phase 20"
weight: 20
---

> **Prerequisite:** [n8n](/blueprint/19-n8n)

Running local language models is one of the most hardware-sensitive things in this guide.

If you have a capable GPU, this section can be genuinely useful.

If you do not, it can still be educational, but keep your expectations realistic:

- CPU-only inference works
- it is just much slower

The stack here is:

- **Ollama** for local model serving
- **Open WebUI** for a browser-based chat interface

---

## Decide Whether This Is Worth It on Your Hardware

Before deploying anything, be honest about your system:

- No GPU: useful mostly for experimentation and small models
- Midrange NVIDIA GPU: practical for a lot of local inference use cases
- High-VRAM GPU: much better for larger models and multiple users

This is one of the few workloads in the guide where "buy more hardware" is often the real answer.

---

## Create the Directories

```bash
mkdir -p ~/docker/appdata/{ollama,openwebui}
mkdir -p ~/docker/compose/llm
```

---

## Create the Baseline Compose File

Create `~/docker/compose/llm/ollama.compose.yml`:

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - /home/<your-user>/docker/appdata/ollama:/root/.ollama
    restart: unless-stopped
    networks: [proxy]

  openwebui:
    image: ghcr.io/open-webui/open-webui:latest
    container_name: openwebui
    ports:
      - "3001:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - /home/<your-user>/docker/appdata/openwebui:/app/backend/data
    depends_on:
      - ollama
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start it:

```bash
docker compose -f ~/docker/compose/llm/ollama.compose.yml up -d
```

Pull a model:

```bash
docker exec -it ollama ollama pull llama3.2
```

Then open:

```text
http://<nixos-ip>:3001
```

---

## GPU Acceleration on NixOS

If the NixOS VM has an NVIDIA GPU passed through to it, you will want GPU-aware container support on the host.

On NixOS, that generally means configuring NVIDIA support in the VM and enabling the NVIDIA container toolkit so Docker containers can see the device.

The exact configuration depends on:

- your GPU generation
- whether you are using proprietary vs open NVIDIA drivers
- how the PCI passthrough is presented to the VM

Because of that variability, I recommend treating GPU enablement as a separate sub-task after the baseline CPU-only stack works.

That may sound cautious, but it is the pragmatic path.

---

## Storage Planning

Models can consume a lot of disk space.

Keep that in mind before you start pulling everything that looks interesting.

If local SSD space is limited, be selective. Unlike photos or documents, LLM model blobs are replaceable. You do not need to hoard them.

---

## Keep It Private

Open WebUI is very tempting to expose publicly because it feels like "just a chat app".

Do not treat it that casually.

It is still an admin-adjacent service tied to your local model host and data.

My recommendation:

- LAN only
- or Tailscale only

unless you have a clear public-access use case and understand the implications.

---

## Next Steps

Next, we will move to document management with Paperless-ngx.

Proceed to [Paperless-ngx](/blueprint/21-paperless-ngx).

---

> **Last updated:** March 2026<br>
