// The site is served under a base path: /serene-heights-lahore inside the Serene Heights Group site
// (Next.js Multi-Zones; set in next.config.ts). Next adds it to <Link> and the router by itself, but not to
// image paths, fetch() calls or absolute URLs, so those go through here.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/serene-heights-lahore";

/** "/assets/x.jpg" -> "/serene-heights-lahore/assets/x.jpg" */
export const asset = (path: string) => `${BASE_PATH}${path}`;
