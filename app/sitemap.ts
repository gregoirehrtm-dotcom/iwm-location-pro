import type { MetadataRoute } from "next";
import { machines } from "@/lib/machines";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/catalogue", "/devis", "/contact", "/a-propos"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
  const machinePages = machines.map((m) => ({ url: `${site.url}/catalogue/${m.slug}`, lastModified: new Date() }));
  return [...pages, ...machinePages];
}
