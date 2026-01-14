# Atlas

Atlas is a Hugo-powered static site that hosts a blueprint for setting up your own home server and self-hosting your own services on it.

The production site is deployed to Cloudflare and is available at https://atlas.neovoid.cc

## Local Development

- Install [Hugo](https://gohugo.io/getting-started/installing/) 0.120 or newer
- Start a live-reload server using `hugo server`
- The site is available at http://localhost:1313 and rebuilds automatically when content, layouts, or assets change.

## Production Build

Connect GitHub repo to Cloudflare and deploy using Cloudflare Pages.

- Build command: `hugo -b $CF_PAGES_URL`
- Build output directory: `/public`
- Build system version: 3 (latest)
- Root directory: `/`
- Environment variables: none

## Project Structure

- `content/` — Markdown sources for blueprint guides and supporting pages
- `layouts/` — Hugo templates, including render hooks and section layouts
- `assets/` — Pipeline-managed CSS and JavaScript (Lightbox, styling, etc.)
- `static/` — Static files copied verbatim into the output (images, downloads)
- `hugo.toml` — Site configuration and metadata

## Contributing

1. Create a feature branch.
2. Run `hugo server` to preview changes locally.
3. Keep Markdown wording intact unless copy edits are intentional.
4. Submit a pull request summarizing the change and verifying the build passes.
