import type { NextConfig } from "next";

// The previous site lived under /lahore (e.g. /lahore/the-project). Send those addresses —
// from Google results, old shares and bookmarks — to the matching new page, permanently.
const OLD_PAGES: [from: string, to: string][] = [
  ["/lahore", "/"],
  ["/lahore/the-project", "/project"],
  ["/the-project", "/project"],
  ["/lahore/about", "/about"],
  ["/lahore/amenities", "/amenities"],
  ["/lahore/invest", "/invest"],
  ["/lahore/contact", "/contact"],
];

// Baseline hardening for every response. The CSP only covers framing, plugins, <base> and form targets:
// locking down scripts too would need per-request nonces, which would turn every static page dynamic.
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // 90 is for the hero tower, which ends up filling the screen; everything else uses the default 75.
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Files in public/assets aren't content-hashed, so cache for a day and refresh in the background
      // rather than marking them immutable (a replaced photo still shows up within a day).
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ];
  },
  async redirects() {
    return [
      ...OLD_PAGES.flatMap(([from, to]) => [
        { source: from, destination: to, permanent: true },
        { source: `${from}/`, destination: to, permanent: true },
        { source: `${from}.html`, destination: to, permanent: true },
      ]),
      // Anything else under the old /lahore path (old images, unknown pages) goes to the home page.
      { source: "/lahore/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
