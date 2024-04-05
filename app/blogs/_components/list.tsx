import { Article } from "@/libs/microcms";
import Link from "next/link";
import { toDateString, toYYYYMMDD } from "@/libs/utils";
import { FaClock } from "react-icons/fa";
import { ReactNode } from "react";
import { ArticleInfo, Author } from "./article-info";
import Image from "next/image";
import Authors from "../authors.json";

export default function BlogList({
  name,
  icon,
  posts,
}: {
  name?: string;
  icon?: ReactNode;
  posts: Article[];
}) {
  return (
    <div>
      <p className="mb-2 text-gray-600 dark:text-gray-400">
        <Link href="/blogs">ブログ</Link> /
      </p>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        <div className="flex flex-row">
          {icon}
          <span className={`-my-1 ${icon && "ml-1"}`}>
            {name && `${name} の`}記事一覧
          </span>
        </div>
      </h1>
      <div className="mt-2 grid">
        {posts.map((post) => {
          if (post.visible === false) return;

          const slug = `${toYYYYMMDD(post.createdAt!)}-${post.id}`;

          return (
            <div
              key={post.id}
              className="border border-gray-300 rounded-md flex flex-col p-4 my-2"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <Link href={`/blogs/category/${post.category.id}`}>
                  {post.category.name}
                </Link> /
              </p>
              <Link href={`/blogs/${slug}`}>
                <p className="text-2xl pb-2 font-semibold">{post.title}</p>
              </Link>
              <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                <div className="flex">
                  <div>
                    <FaClock className="my-1" />
                  </div>
                  <p className="ml-1">
                    {toDateString(new Date(post.publishedAt!))}
                  </p>
                </div>
                <ArticleInfo
                  tags={post.tags}
                  authors={post.authors?.map(
                    (e) => (Authors as any)[e] as Author
                  )}
                />
              </div>

              {post.description && <p>{post.description}</p>}

              {post.eyecatch && (
                <div className="flex justify-center items-center">
                  <Image
                    className="mt-2 rounded-lg"
                    src={post.eyecatch.url}
                    width={800}
                    height={0}
                    alt={"アイキャッチ"}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
