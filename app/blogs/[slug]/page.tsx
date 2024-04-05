import { getArticleDetail, getArticles } from "@/libs/microcms";

import { notFound, redirect } from "next/navigation";

import "highlight.js/styles/github-dark.css";
import { getSlug, toYYYYMMDD } from "@/libs/utils";
import { Metadata } from "next";
import ArticleContent from "../_components/article";

export const runtime = "edge";
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { id, date } = getSlug(params.slug);
  const post = await getArticleDetail(id).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  const createdAt = toYYYYMMDD(post.createdAt);
  if (createdAt != date) redirect(`/blogs/${createdAt}-${id}`);

  let metadata = {
    title: post.title,
    description: post.description,
    robots: {
      index: post.visible
    }
  } as Metadata;

  if (post.eyecatch) {
    metadata.openGraph = {
      images: [post.eyecatch.url],
    };
    metadata.twitter = {
      card: "summary_large_image",
      creator: "@nekok500",
      images: post.eyecatch.url,
    };
  }

  return metadata;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { id, date } = getSlug(params.slug);
  const article = await getArticleDetail(id).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  const createdAt = toYYYYMMDD(article.createdAt);
  if (createdAt != date) redirect(`/blogs/${createdAt}-${id}`);

  return ArticleContent({ article: article });
}

export async function generateStaticParams() {
  const { contents } = await getArticles();

  const paths = contents.map((post) => {
    return {
      slug: `${toYYYYMMDD(post.createdAt)}-${post.id}`,
    };
  });

  return [...paths];
}
