# John Andre — Virtual Assistant Portfolio

A one-page portfolio site built with plain HTML, CSS, and JavaScript. No build step and no dependencies,
so it deploys directly on GitHub Pages.

## Files
- `index.html`  page content, SEO metadata, case-study text (inside `<template>` blocks)
- `styles.css`  all styling (colors and fonts are CSS variables at the top)
- `script.js`   drawers, toolkit filter, and the pre-filled contact message
- `assets/john-profile.jpg`  profile photo (EXIF/GPS metadata removed)
- `assets/favicon.svg`  browser tab icon

## Deploy (GitHub Pages)
1. Delete the old `index.html`, `styles.css`, and `script.js` in the repo, then upload the new ones.
2. Upload the `assets` folder (it must stay named `assets`, with both files inside).
3. Settings > Pages: Deploy from a branch > `main` > `/ (root)`.
4. Wait about a minute, then open the site in a private window to avoid cached files.

## Editing content
- Stats at the top: the `.proof` list in `index.html` (plain text, no JavaScript involved).
- Case studies: the `<template id="case-...">` blocks near the bottom of `index.html`.
- Contact details: search for `john.llanderal21@gmail.com` and `639214512028` (in `index.html` and `script.js`).
- Booking: the Calendly URL appears in the `#book` section of `index.html`.
