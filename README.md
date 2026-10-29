# Serene Heights Lahore — website

Next.js 16 (App Router) · React 19 · TypeScript · GSAP ScrollTrigger · Nodemailer

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

> The scripts call `node node_modules/next/dist/bin/next` directly because Windows' `.cmd` shims break on the `&` in the folder name `WEBS & APPS`.

## Enquiry emails

The contact form and the footer "Request a Callback" post to `/api/enquiry`, which emails the team via SMTP.
Copy `.env.example` to `.env.local` and fill in the SMTP details. Until it's configured, enquiries are accepted and printed to the server log instead of being emailed.

Both forms are protected against bots: a hidden trap field, a minimum time to fill the form, and at most 5 enquiries per visitor per 10 minutes (see `src/app/api/enquiry/route.ts`).

## Structure

- `src/app/` — pages (`/`, `/project`, `/amenities`, `/invest`, `/about`, `/contact`) and `api/enquiry`
- `src/components/` — Header, Footer, Hero (pinned scroll sequence: tower rises out of the clouds, melts into the "SERENE" lettering, clouds roll up), ScrollFx (scroll reveals, parallax), sliders and forms
- `src/lib/site.ts` — live site address (`SITE_URL`), phone numbers, email, navigation and form interests (edit contact details here)
- `src/app/robots.ts`, `src/app/sitemap.ts`, `icon.png` / `favicon.ico` — search-engine files and site icons; each page sets its own link preview via `pageMeta()`
- `public/assets/` — images; `public/assets/hero/` holds the hero's sky, tower cut-out and rendered cloud layers
- `legacy-static/` — the earlier plain HTML version, kept locally for reference (not in git)

## Deploy

Push to GitHub and import the repo on Vercel (zero config), or run `npm run build && npm start` on any Node 20+ host. Add the SMTP variables in the host's environment settings.

Before going live, set `SITE_URL` in `src/lib/site.ts` to the final address. Old addresses from the previous site (`/lahore`, `/lahore/the-project`, …) redirect permanently to the new pages (see `next.config.ts`).
