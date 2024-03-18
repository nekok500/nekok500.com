import { MicroCMSDate, MicroCMSImage, createClient } from "microcms-js-sdk";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const client = createClient({
  serviceDomain: "nekok500-com",
  apiKey: getRequestContext().env.MICROCMS_API_KEY,
});

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  tags?: Tag[];
  category: Category;
  description?: string;
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
