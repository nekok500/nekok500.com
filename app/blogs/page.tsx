import { getArticles } from "@/libs/microcms";
import BlogList from "./_components/list";
import { Metadata } from "next";

export const revalidate = 3600;
export const runtime = "edge";

export const metadata: Metadata = {
  title: "ブログ",
};

export default async function BlogListPage() {
  const { contents } = await getArticles();

  return <BlogList posts={contents} />;
}
