# The Den Rewards Mobile Training Tool

Mobile-first training app for Cascadia Liquor team members and managers. The app is designed to be deployed as a static Vite site on Vercel.

## What it includes

- Team Member training path
- Manager coaching path
- Scenario-based checks
- Checklist-based module completion
- Local progress persistence in the browser

## Local development

Prerequisite: Node.js

1. Install dependencies:
   `npm install`
2. Start the local dev server:
   `npm run dev`
3. Build for production:
   `npm run build`

## Vercel deployment

This project is ready to import directly into Vercel.

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

The project also includes [vercel.json](./vercel.json) with the expected build settings.
