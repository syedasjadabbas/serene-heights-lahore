import type { Metadata } from "next";

/** Live address of the site (used for link previews, the sitemap and canonical URLs). */
export const SITE_URL = "https://www.sereneheightslahore.com";

export const site = {
  name: "Serene Heights Lahore",
  tagline: "A landmark 21-storey mixed-use commercial development on Gulberg Main Boulevard, Lahore.",
  email: "info@sereneheightslahore.com",
  address: "Gulberg Main Boulevard, Lahore, Pakistan",
  groupUrl: "https://www.sereneheightsgroup.com/lahore",
  phones: {
    commercial: { label: "For Corporate Office / Commercial", numbers: ["0304-1111106"] },
    hospitality: { label: "For Co-Working / Hotel Apartments", numbers: ["0321-4979446", "0300-8497999"] },
  },
};

/** Contact-form interests; link to /contact?for=<key> to preselect one. */
export const interests = {
  retail: "Commercial / Retail Floors",
  offices: "Office Floors",
  coworking: "Co-Working Floors",
  hotel: "Hotel Apartments",
  smart: "Smart Property (from PKR 2 million)",
  visit: "Site Visit",
} as const;
export type InterestKey = keyof typeof interests;
export const enquire = (key: InterestKey) => `/contact?for=${key}`;

/** "0304-1111106" -> "tel:03041111106" */
export const tel = (n: string) => `tel:${n.replace(/\D/g, "")}`;

export const nav = [
  { href: "/project", label: "The Project" },
  {
    href: "/project#configuration",
    label: "Floors",
    children: [
      { href: "/project#commercial", label: "Commercial Floors" },
      { href: "/project#offices", label: "Office Floors" },
      { href: "/project#coworking", label: "Co-Working Floors" },
      { href: "/project#hotel", label: "Hotel Apartments" },
    ],
  },
  {
    href: "/amenities",
    label: "Amenities",
    children: [
      { href: "/amenities#architecture", label: "Architecture" },
      { href: "/amenities#services", label: "Services & Amenities" },
    ],
  },
  { href: "/invest", label: "Invest" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Page metadata: title, description, canonical address and the link preview (WhatsApp, Facebook, X…). */
export function pageMeta({ title, description, path, image }: { title?: string; description: string; path: string; image: string }): Metadata {
  const full = title ? `${title} | ${site.name}` : `${site.name} | 21-Storey Commercial Landmark on Gulberg Main Boulevard`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: site.name, images: [{ url: image, alt: full }], type: "website", locale: "en_PK" },
    twitter: { card: "summary_large_image", title: full, description, images: [image] },
  };
}
