---
title: "Local LLMs"
phase: "Phase 20"
weight: 20
---

This page sets up Ollama for local models and OpenWebUI as a web chat UI.

## 1) Docker Compose
Create: `~/docker/compose/llm/ollama.compose.yml`

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ~/docker/appdata/ollama:/root/.ollama
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
      - ~/docker/appdata/openwebui:/app/backend/data
    depends_on:
      - ollama
    restart: unless-stopped
    networks: [proxy]

networks:
  proxy:
    external: true
```

Start:
```bash
docker compose -f ~/docker/compose/llm/ollama.compose.yml up -d
```

## 2) Pull a model
```bash
docker exec -it ollama ollama pull llama3.2
```

Open:
- `http://<debian-ip>:3001`

## GPU acceleration note
If you have an NVIDIA GPU, you’ll want the NVIDIA container toolkit and compose GPU settings.

## Next
Proceed to: **[Paperless-ngx](20-paperless-ngx.md)**


---
**Navigation:** ← [Workflow Automation: n8n](18-n8n.md) | [Document Management: Paperless-ngx](20-paperless-ngx.md) →
