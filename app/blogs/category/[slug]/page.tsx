import { Blog, Category, client } from "@/libs/microcms";
import BlogList from "../../_components/list";
import { FaAlignLeft } from "react-icons/fa";
import { Metadata } from "next";

export const revalidate = 60;
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId: params.slug,
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
  const category = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId: params.slug,
  });
  const posts = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { filters: `category[equals]${category.id}` },
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
  const { contents } = await client.getList<Category>({
    endpoint: "categories",
  });

  const paths = contents.map((category) => {
    return {
      slug: category.id,
    };
  });

  return [...paths];
}
