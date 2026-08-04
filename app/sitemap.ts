import type { MetadataRoute } from "next";

const SITE_URL = "https://anatomy.itea.fit";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
    },
  ];
}
