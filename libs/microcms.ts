import {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
  createClient,
} from "microcms-js-sdk";
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";

export const client = createClient({
  serviceDomain: "nekok500-com",
  apiKey:
    getOptionalRequestContext()?.env.MICROCMS_API_KEY ||
    process.env.MICROCMS_API_KEY!, // generateStaticParamsの時に詰む対策
});

export type Article = {
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

export const getArticleDetail = (id: string) =>
  client.getListDetail<Article>({
    endpoint: "articles",
    contentId: id,
    customRequestInit: {
      next: { revalidate: 3600, tags: ["/blogs", `/blogs/articles/${id}`] },
    },
  });

export const getArticles = (queries?: MicroCMSQueries) =>
  client.getList<Article>({
    endpoint: "articles",
    customRequestInit: {
      next: { revalidate: 3600, tags: ["/blogs", "/blogs/articles/l"] },
    },
    queries,
  });

export const getCategoryDetail = (id: string) =>
  client.getListDetail<Category>({
    endpoint: "categories",
    contentId: id,
    customRequestInit: {
      next: { revalidate: 3600, tags: ["/blogs", `/blogs/categories/${id}`] },
    },
  });

export const getCategories = () =>
  client.getList<Category>({
    endpoint: "categories",
    customRequestInit: {
      next: { revalidate: 3600, tags: ["/blogs", "/blogs/categories/l"] },
    },
  });

export const getTagDetail = (id: string) =>
  client.getListDetail<Tag>({
    endpoint: "tags",
    contentId: id,
    customRequestInit: {
      next: { revalidate: 3600, tags: ["/blogs", `/blogs/tags/${id}`] },
    },
  });

export const getTags = () =>
  client.getList<Tag>({
    endpoint: "tags",
    customRequestInit: {
      next: { revalidate: 3600, tags: ["/blogs", "/blogs/tags/l"] },
    },
  });
