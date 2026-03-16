---
title: "Watchtower"
phase: "Phase 22"
weight: 22
---

> **Prerequisite:** [Paperless-ngx](/blueprint/21-paperless-ngx)

Everyone likes the idea of automatic updates right up until an automatic update breaks something important.

That does not mean **Watchtower** is bad. It means you should use it with judgment.

Watchtower can monitor running Docker containers and update them when new images are available. For low-risk containers, that can be convenient. For stateful or mission-critical services, blind automation is often the wrong trade.

---

## My Recommendation

Use Watchtower selectively.

Good candidates:

- simple utility containers
- low-risk dashboards
- disposable services

Be cautious with:

- databases
- Immich
- Paperless-ngx
- anything where an upstream breaking change would ruin your week

In other words:

> convenience is not a backup strategy and it is not a change-management strategy

---

## Create the Compose File

Create `~/docker/compose/core/watchtower.compose.yml`:

```yaml
services:
  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - TZ=America/New_York
      - WATCHTOWER_SCHEDULE=0 0 4 * * *
      - WATCHTOWER_CLEANUP=true
    restart: unless-stopped
```

Start it:

```bash
docker compose -f ~/docker/compose/core/watchtower.compose.yml up -d
```

That example checks for updates daily at 4:00 AM.

---

## A Better Pattern Than "Update Everything"

If you want to use Watchtower responsibly, consider one of these approaches:

- use it only for a small set of low-risk containers
- or use notifications only, then update manually

For important services, a deliberate update flow is better:

1. take a snapshot or backup
2. update one service
3. verify it still works
4. move on

That sounds slower because it is slower.

It is also much less stupid.

---

## Docker Socket Warning

Watchtower needs access to the Docker socket to manage containers.

That is powerful access.

Do not forget that "a container with the Docker socket mounted" is not a low-privilege thing just because it looks like a simple sidecar.

---

## Next Steps

Next, we will talk about domains, reverse proxies and the question of when public access actually makes sense.

Proceed to [Domain](/blueprint/23-domain).

---

> **Last updated:** March 2026<br>
