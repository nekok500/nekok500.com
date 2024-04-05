import { getArticles } from "@/libs/microcms";
import { toYYYYMMDD } from "@/libs/utils";
import { MetadataRoute } from "next";

export const runtime = "edge";
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { contents } = await getArticles();

  return [
    {
      url: "https://nekok500.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://nekok500.com/blogs",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...contents
      .filter((p) => p.visible)
      .map((p) => ({
        url: `https://nekok500.com/blogs/${toYYYYMMDD(p.createdAt)}-${p.id}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.3,
      })),
  ];
}
