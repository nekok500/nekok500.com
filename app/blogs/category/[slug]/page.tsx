import { getArticles, getCategories, getCategoryDetail } from "@/libs/microcms";
import BlogList from "../../_components/list";
import { FaAlignLeft } from "react-icons/fa";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryDetail(params.slug).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  return {
    title: `${category.name} の記事一覧`,
  };
}

export default async function ListByCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryDetail(params.slug).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  const posts = await getArticles({
    filters: `category[equals]${category.id}`,
  });

  return (
    <BlogList
      name={category.name}
      icon={<FaAlignLeft />}
      posts={posts.contents}
    />
  );
}

export async function generateStaticParams() {
  const { contents } = await getCategories();

  const paths = contents.map((category) => {
    return {
      slug: category.id,
    };
  });

  return [...paths];
}
