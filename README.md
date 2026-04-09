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

## Google Sheets completion tracking

The training completion flow posts to a Google Apps Script webhook that appends rows to a Google Sheet.

1. Create a Google Sheet and add headers such as:
   `completedAt | traineeFirstName | traineeLastName | traineeName | store | startedAt | completionScore | basicsComplete | posComplete | accountComplete | firstAttemptResultsJson`
2. In Google Sheets, open `Extensions > Apps Script` and publish a web app that accepts `POST` requests.
3. Set the Vercel environment variable `GOOGLE_SHEETS_WEBHOOK_URL` to the Apps Script deployment URL.
4. Redeploy the app after setting the env var.

If the webhook is not configured, the app will show a clear error when a trainee tries to submit completion.
