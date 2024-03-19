import { Blog } from "@/libs/microcms";
import Link from "next/link";
import { toDateString, toYYYYMMDD } from "@/libs/utils";
import { FaClock } from "react-icons/fa";
import { ReactNode } from "react";
import { Tags } from "./tags";
import Image from "next/image";

export default function BlogList({
  name,
  icon,
  posts,
}: {
  name?: string;
  icon?: ReactNode;
  posts: Blog[];
}) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        <div className="flex flex-row">
          {icon}
          <span className={`-my-1 ${icon ? "ml-1" : ""}`}>
            {name ? `${name} の` : "ブログ"}記事一覧
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
              <Link href={`/blogs/${slug}`}>
                <p className="text-2xl py-2 font-semibold">{post.title}</p>
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
                {post.tags && <Tags tags={post.tags} />}
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
