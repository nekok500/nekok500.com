import { getArticles, getTagDetail, getTags } from "@/libs/microcms";
import BlogList from "../../_components/list";
import { FaTag } from "react-icons/fa";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = await getTagDetail(params.slug).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  return {
    title: `${tag.name} の記事一覧`,
  };
}

export default async function ListByTagPage({
  params,
}: {
  params: { slug: string };
}) {
  const tag = await getTagDetail(params.slug).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });
  const articles = await getArticles({
    filters: `tags[contains]${tag.id}`,
  });

  return (
    <BlogList name={tag.name} icon={<FaTag />} posts={articles.contents} />
  );
}

export async function generateStaticParams() {
  const { contents } = await getTags();

  const paths = contents.map((tag) => {
    return {
      slug: tag.id,
    };
  });

  return [...paths];
}
