# Deployment Guide

This project uses two Cloudflare services:
- **Workers**: Handles dynamic logic (API routes, SSR)
- **Pages**: Hosts static assets (images, 3D models)

## Prerequisites

1. Install Wrangler CLI
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare
   ```bash
   wrangler login
   ```

## Deployment Steps

### Option 1: Deploy Everything

```bash
npm run deploy:all
```

This will:
1. Build the project
2. Deploy the Worker
3. Deploy static assets to Pages

### Option 2: Deploy Separately

#### Deploy Worker
```bash
npm run build
npm run deploy
```

#### Deploy Static Assets
```bash
npm run deploy:static
```

## URLs

After deployment:
- **Worker**: `https://anatomy.<your-subdomain>.workers.dev`
- **Static Assets**: `https://anatomy-static.pages.dev`

## Configuration

### Worker (wrangler.toml)
- Main entry: `worker/index.ts`
- Compatibility: Node.js compat enabled
- D1: Optional (uncomment in wrangler.toml if needed)

### Pages
- Project name: `anatomy-static`
- Source: `public/` directory
- No build step needed (static files)

## Environment Variables

No environment variables required for basic deployment.

If using D1:
1. Create database in Cloudflare dashboard
2. Update `wrangler.toml` with database ID
3. Uncomment D1 binding configuration

## Free Tier Limits

- **Workers**: 100K requests/day
- **Pages**: 500 builds/month, unlimited bandwidth
- **D1**: 5GB storage, 5M reads/day (if enabled)

No credit card required for these services.

## Troubleshooting

### Static assets not loading
- Check if Pages deployment succeeded
- Verify the URL in browser
- Check CORS if accessing from different domain

### Worker errors
- Check wrangler logs: `wrangler tail`
- Verify `wrangler.toml` configuration
- Check compatibility flags
