import type { MetadataRoute } from "next";
import { SITE, MODELS } from "@/lib/constants";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/models", "/pricing", "/booking", "/faq", "/contact", "/about", "/terms", "/privacy", ...MODELS.map((m) => `/models/${m.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
