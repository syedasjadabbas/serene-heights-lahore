import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BASE_PATH } from "@/lib/asset";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}${BASE_PATH}/sitemap.xml`,
  };
}
