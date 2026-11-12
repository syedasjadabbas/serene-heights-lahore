import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BASE_PATH } from "@/lib/asset";

const pages: [path: string, priority: number][] = [
  ["/", 1],
  ["/project", 0.9],
  ["/invest", 0.9],
  ["/amenities", 0.8],
  ["/about", 0.7],
  ["/contact", 0.8],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(([path, priority]) => ({
    url: `${SITE_URL}${BASE_PATH}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
