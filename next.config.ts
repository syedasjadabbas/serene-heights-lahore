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

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
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
