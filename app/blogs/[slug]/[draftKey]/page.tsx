import { getArticleDetail, getArticles } from "@/libs/microcms";

import { notFound, redirect } from "next/navigation";

import { getSlug, toYYYYMMDD } from "@/libs/utils";
import { Metadata } from "next";
import ArticleContent from "../../_components/article";

export const runtime = "edge";
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string; draftKey: string };
}): Promise<Metadata> {
  const { id, date } = getSlug(params.slug);
  const article = await getArticleDetail(id, {
    draftKey: params.draftKey,
  }).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  const createdAt = toYYYYMMDD(article.createdAt);
  if (createdAt != date) redirect(`/blogs/${createdAt}-${id}`);

  let metadata: Metadata = {
    title: `下書き: ${article.title}`,
    description: article.description,
    robots: {
      index: false,
    },
  };

  if (article.eyecatch) {
    metadata = {
      openGraph: {
        images: [article.eyecatch.url],
      },
      twitter: {
        card: "summary_large_image",
        creator: "@nekok500",
        images: article.eyecatch.url,
      },
      ...metadata,
    };
  }

  return metadata;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string; draftKey: string };
}) {
  const { id, date } = getSlug(params.slug);
  const article = await getArticleDetail(id, {
    draftKey: params.draftKey,
  }).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  const createdAt = toYYYYMMDD(article.createdAt);
  if (createdAt != date)
    redirect(`/blogs/${createdAt}-${id}/${params.draftKey}`);

  return ArticleContent({ article: article, isDraft: true });
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
