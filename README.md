# Anatomy Atelier

An interactive visual atlas for exploring human anatomy and organ systems through medically detailed 3D models.

**Live site:** [https://anatomy.itea.fit/](https://anatomy.itea.fit/)

## Features

- Explore nine human organs with interactive 3D models
- Rotate, zoom, isolate, compare, and inspect anatomical hotspots
- Read concise information about structure, location, function, and common conditions
- Search the organ library and use responsive layouts on desktop and mobile
- Share the site with production-ready metadata and social preview images

## Tech stack

- Next.js 16 and React 19
- Three.js for the 3D anatomy viewer
- GSAP for interface transitions
- vinext and Cloudflare Workers for deployment

## Requirements

- Node.js `>=22.13.0`

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by vinext.

## Validation

```bash
npm run lint
npm test
```

`npm test` runs a production build and verifies the production domain metadata, crawler routes, and referenced 3D model assets.

## Deployment

```bash
npm run deploy
```

The production site is served from `https://anatomy.itea.fit/`.

## Project structure

```text
app/                  Application routes, components, styles, and anatomy data
public/anatomy/       Organ illustrations
public/models/        3D organ models
tests/                Build-time and source validation
worker/               Cloudflare Worker entry point
```

## Content notice

The site is intended for anatomy education. Medical facts should be reviewed against reliable clinical or academic sources before being used for diagnosis, treatment, or professional decision-making.
