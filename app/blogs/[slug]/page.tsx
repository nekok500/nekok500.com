import { getBlogDetail } from "@/libs/microcms";
import { load } from "cheerio";
import hljs from "highlight.js";
import { notFound } from "next/navigation";

import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import { toDateString } from "@/libs/utils";
import { Tags } from "../_components/tags";
import { Metadata } from "next";

export const runtime = "edge";
export const revalidate = 3600;

function getSlug(slug: string): string {
  if (slug.match(/^\d{8}-/)) {
    return slug.split("-").slice(1).join("-");
  } else {
    return slug;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogDetail(getSlug(params.slug)).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  if (post.eyecatch) {
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        images: [post.eyecatch.url],
      },
      twitter: {
        card: "summary_large_image",
        creator: "@nekok500",
        images: post.eyecatch.url,
      },
    };
  } else {
    return {
      title: post.title,
      description: post.description,
    };
  }
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogDetail(getSlug(params.slug)).catch((e: Error) => {
    if (e.message.includes("404")) return notFound();

    throw e;
  });

  const $ = load(post.content);
  $("pre code").each((_, elm) => {
    const className = $(elm).attr("class");
    const language = className?.replace("language-", "");

    let result;
    if (language) {
      try {
        result = hljs.highlight($(elm).text(), { language });
      } catch {
        result = hljs.highlightAuto($(elm).text());
      }
    } else {
      result = hljs.highlightAuto($(elm).text());
    }
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return (
    <div>
      <p className="text-md text-gray-600 dark:text-gray-400">
        <Link href="/blogs">ブログ</Link> /{" "}
        <Link href={`/blogs/category/${post.category.id}`}>
          {post.category.name}
        </Link>
      </p>
      <h1 className="text-4xl font-semibold my-1 text-gray-900 dark:text-gray-100 text-wrap">
        {post.title}
      </h1>
      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div className="flex flex-col">
          <p className="">
            公開日時: {toDateString(new Date(post.publishedAt!))}
          </p>
          {post.publishedAt != post.updatedAt && (
            <p className="">
              更新日時: {toDateString(new Date(post.updatedAt!))}
            </p>
          )}
        </div>
        {post.tags && <Tags tags={post.tags} />}
      </div>

      <div
        className="mt-2 content"
        dangerouslySetInnerHTML={{ __html: $.html() }}
      />
    </div>
  );
}

// export async function generateStaticParams() {
//   const { contents } = await client.getList<Blog>({
//     endpoint: "blogs",
//   });

//   const paths = contents.map((post) => {
//     return {
//       slug: post.id,
//     };
//   });

//   return [...paths];
// }
