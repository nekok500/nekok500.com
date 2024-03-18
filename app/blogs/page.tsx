import { Blog, client } from "@/libs/microcms";
import BlogList from "./_components/list";

export const revalidate = 60;
export const runtime = "edge";

export default async function Blogs() {
  const { contents } = await client.getList<Blog>({ endpoint: "blogs" });

  return <BlogList posts={contents} />;
}
