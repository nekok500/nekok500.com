import { Tag } from "@/libs/microcms";
import Link from "next/link";

export function Tags({ tags }: { tags: Tag[] }) {
  return (
    <>
      <ul className="flex justify-items-end">
        {tags
          ?.sort((a, b) => a.index - b.index)
          .map((tag) => (
            <li
              key={tag.id}
              className="border border-gray-300 rounded-md ml-1 px-1"
            >
              <Link href={`/blogs/tag/${tag.id}`}>{tag.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
