# Sovereignty Equestrian — Website

A React (Vite) single-page, multi-section site using hash routing. Brand colors: royal navy, gold, black, white.
Photos/videos live in `/public` so you can upload/replace media without code changes.

## Run locally
```bash
npm install
npm run dev
```

## Uploading photos & videos
Place files here and reference them as `/images/...` or `/video/...`:
```
public/images/owners
public/images/horses
public/video
```
Then replace any "Photo placeholder" boxes in `src/App.jsx` with an `<img>` or `<video>` tag, e.g.
```jsx
<img src="/images/owners/makayla.jpg" alt="Makayla Macleod" className="h-full w-full object-cover rounded-2xl" />
<video controls className="w-full aspect-video rounded-2xl">
  <source src="/video/facility-tour.mp4" type="video/mp4" />
</video>
```
You can also embed YouTube/Vimeo with an `<iframe>` if preferred.

## Deploy to Vercel (recommended)
1. Create a new GitHub repo and push this folder.
2. In Vercel: **New Project** → import the repo.
3. Build Command: `npm run build`, Output Directory: `dist`.
4. Deploy. Add a custom domain in Vercel settings when ready.

## Deploy to Netlify (also easy)
1. Push to GitHub.
2. In Netlify: **New site from Git** → select repo.
3. Build: `npm run build`, Publish directory: `dist`.
4. Deploy. Add custom domain in Netlify settings.

## Notes
- Styling uses Tailwind via the Play CDN for simplicity—no extra build step required.
- Hash routing ensures direct links work on any static host and the site always opens on Home.
- Replace the logo by replacing `public/logo.png`.
