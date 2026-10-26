import type { MetadataRoute } from "next";
import { MODELS, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/models", "/pricing", "/booking", "/faq", "/contact", "/about", "/terms", "/privacy", ...MODELS.map((m) => `/models/${m.id}`)];
  return pages.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() }));
}
