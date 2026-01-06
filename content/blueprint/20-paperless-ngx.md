---
title: "Document Management: Paperless-ngx"
phase: "Phase 20"
weight: 20
---

Paperless-ngx turns paper into searchable documents with OCR and tagging.

## Storage recommendations
On NAS:
- Inbox/consume: `/mnt/nas/documents/inbox`
- Archive: `/mnt/nas/documents/archive`

Keep appdata/DB on fast local disk if possible.

## Deployment note
Paperless-ngx has an official compose example that’s the best baseline.

### Recommended approach
1. Start from Paperless-ngx official compose
2. Map consume and media/archive volumes to your NAS paths
3. Configure OCR language and user accounts
4. Test ingestion by dropping a PDF into the consume folder

## Next
Proceed to: **[Watchtower](21-watchtower.md)**


---
**Navigation:** ← [Local LLMs: Ollama + OpenWebUI](19-ollama-openwebui.md) | [Auto Updates: Watchtower](21-watchtower.md) →
