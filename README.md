# Atlas

Atlas is a Hugo-powered static site that hosts a blueprint for setting up your own home server and self-hosting your own services on it.

The production site is deployed to Cloudflare and is available at https://atlas.neovoid.cc

## Local Development

- Install [Hugo](https://gohugo.io/getting-started/installing/) 0.120 or newer
- Start a live-reload server using `hugo server`
- The dev site is now accessible at http://localhost:1313 and rebuilds automatically when content, layouts, or assets change.

## Production Build

Connect GitHub repo to Cloudflare and deploy using Cloudflare Pages.

- Build command: `hugo -b $CF_PAGES_URL`
- Build output directory: `/public`
- Build system version: 3 (latest)
- Root directory: `/`
- Environment variables: none

## Project Structure

- `content/blueprint/` - Markdown sources for guide docs
- `layouts/` - Custom templates, render hooks and section layouts
- `assets/` - CSS and JavaScript
- `static/` - Static files and images
- `hugo.toml` - Site config and metadata
