#!/bin/bash
# Deploy static assets to Cloudflare Pages
# This script deploys images and 3D models to a separate Pages project

set -e

echo "Deploying static assets to Cloudflare Pages..."

# Deploy public directory to Pages
wrangler pages deploy public/ \
  --project-name=anatomy-static \
  --branch=main \
  --commit-dirty=true

echo ""
echo "✅ Static assets deployed!"
echo ""
echo "Your static assets URL will be:"
echo "  https://anatomy-static.pages.dev"
echo ""
echo "Update your app to use this URL for images and models."
