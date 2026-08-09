import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SERVICES } from "@/lib/services";
import { POSTS } from "@/lib/blog";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICES.map((sv) => ({
      url: `${SITE.url}/services/${sv.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE.url}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...POSTS.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.published),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...CASE_STUDIES.map((cs) => ({
      url: `${SITE.url}/work/${cs.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
