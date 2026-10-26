import type { MetadataRoute } from "next";
import { COMPANY, MODELS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/models", ...MODELS.map((m) => `/models/${m.slug}`), "/pricing", "/booking", "/faq", "/contact", "/about", "/terms", "/privacy"];
  return paths.map((p) => ({ url: `${COMPANY.url}${p}`, lastModified: new Date() }));
}
