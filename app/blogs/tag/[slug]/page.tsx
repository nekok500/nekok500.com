import { Blog, Tag, client } from "@/libs/microcms";
import BlogList from "../../_components/list";
import { FaTag } from "react-icons/fa";
import { Metadata } from "next";

export const revalidate = 60;
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = await client.getListDetail<Tag>({
    endpoint: "tags",
    contentId: params.slug,
  });

  return {
    title: `${tag.name} の記事一覧`,
  };
}

export default async function ListByTag({
  params,
}: {
  params: { slug: string };
}) {
  const tag = await client.getListDetail<Tag>({
    endpoint: "tags",
    contentId: params.slug,
  });
  const posts = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { filters: `tags[contains]${tag.id}` },
  });

  return <BlogList name={tag.name} icon={<FaTag />} posts={posts.contents} />;
}

export async function generateStaticParams() {
  const { contents } = await client.getList<Tag>({
    endpoint: "tags",
  });

  const paths = contents.map((tag) => {
    return {
      slug: tag.id,
    };
  });

  return [...paths];
}
