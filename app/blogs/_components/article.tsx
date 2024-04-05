import { Article } from "@/libs/microcms";
import { ArticleInfo, Author } from "./article-info";
import { load } from "cheerio";
import Link from "next/link";
import Authors from "../authors.json";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import { toDateString } from "@/libs/utils";
export default function ArticleContent({
  article,
  isDraft,
}: {
  article: Article;
  isDraft?: boolean;
}) {
  const $ = load(article.content);
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
      <p className="mb-1 text-md text-gray-600 dark:text-gray-400">
        <Link href="/blogs">ブログ</Link> /{" "}
        <Link href={`/blogs/category/${article.category.id}`}>
          {article.category.name}
        </Link>
      </p>
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 text-wrap">
        {isDraft && "下書き: "}
        {article.title}
      </h1>
      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div className="flex flex-col">
          {!isDraft && (
            <p className="">
              公開日時: {toDateString(new Date(article.publishedAt!))}
            </p>
          )}
          {article.publishedAt != article.updatedAt && (
            <p className="">
              更新日時: {toDateString(new Date(article.updatedAt))}
            </p>
          )}
        </div>
        {article.tags && (
          <ArticleInfo
            tags={article.tags}
            authors={article.authors?.map((e) => (Authors as any)[e] as Author)}
          />
        )}
      </div>

      <div
        className="mt-2 content"
        dangerouslySetInnerHTML={{ __html: $.html() }}
      />
    </div>
  );
}
