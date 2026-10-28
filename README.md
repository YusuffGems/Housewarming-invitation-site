# Housewarming Invitation

Static site (HTML + CSS + JS). No build step.

## Structure
- `index.html`   – UI markup
- `css/style.css` – styling (light/dark)
- `js/config.js`  – event details (date, phone, address, map)
- `js/script.js`  – logic (countdown, calendar, share, map/links)
- `vercel.json`   – Vercel config

## Deploy on Vercel
1. Unzip and push this folder to a GitHub repo, then import it in Vercel
   (Framework Preset: **Other**, no build command, output directory blank).
2. Or with CLI: `npm i -g vercel` then run `vercel --prod` inside this folder.

## Run locally
Open `index.html` in a browser, or run `npx serve .`
