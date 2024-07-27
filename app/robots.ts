import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${headersList.get('x-base-url')}/sitemap.xml`,
  };
}