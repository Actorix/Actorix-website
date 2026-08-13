import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SERVICES } from "@/lib/services";
import { POSTS } from "@/lib/blog";
import { SITE } from "@/lib/seo";

/* `images` emits Google's image-sitemap extension. It only ever lists images
   that genuinely appear on that page — listing images a page does not show is
   against Google's guidance and is the fastest way to get the whole sitemap
   distrusted. */
const abs = (path: string) => `${SITE.url}${path}`;

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
      images: [abs(sv.cover)],
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
      images: [abs(post.cover)],
    })),
    ...CASE_STUDIES.map((cs) => ({
      url: `${SITE.url}/work/${cs.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(cs.image ? { images: [abs(cs.image)] } : {}),
    })),
    {
      // the lookup form only — /verify/<number> results are noindex by design
      url: `${SITE.url}/verify`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
