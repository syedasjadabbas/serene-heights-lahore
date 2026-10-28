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

## Structure

- `src/app/` — pages (`/`, `/project`, `/amenities`, `/invest`, `/about`, `/contact`) and `api/enquiry`
- `src/components/` — Header, Footer, Hero (pinned video + zoom-through), ScrollFx (scroll reveals, parallax), sliders and forms
- `src/lib/site.ts` — phone numbers, email, navigation (edit contact details here)
- `public/assets/` — images and video
- `legacy-static/` — the earlier plain HTML version, kept for reference

## Deploy

Push to GitHub and import the repo on Vercel (zero config), or run `npm run build && npm start` on any Node 20+ host. Add the SMTP variables in the host's environment settings.
