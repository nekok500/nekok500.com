import { MicroCMSDate, MicroCMSImage, createClient } from "microcms-js-sdk";
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";

export const revalidate = 600;

export const client = createClient({
  serviceDomain: "nekok500-com",
  apiKey:
    getOptionalRequestContext()?.env.MICROCMS_API_KEY ||
    process.env.MICROCMS_API_KEY!, // generateStaticParamsの時に詰む対策
});

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  tags?: Tag[];
  category: Category;
  description?: string;
  visible?: boolean;
} & MicroCMSDate;

export type Category = {
  id: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
  index: number;
};

export const getBlogDetail = async (id: string) => {
  const props = {
    endpoint: "blogs",
    contentId: id,
    customRequestInit: {
      next: {
        tags: ["blogs", `blogs/${id}`],
        revalidate: 600,
      },
    },
  };
  console.log("requesting with props: ", props);
  return await client.getListDetail<Blog>(props);
};
