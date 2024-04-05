import { Tag } from "@/libs/microcms";
import Link from "next/link";
import Collaborator from "../../_components/collaborator";

export type Author = {
  name: string;
  avatar: string;
};

export function ArticleInfo({
  tags,
  authors,
}: {
  tags?: Tag[];
  authors?: Author[];
}) {
  return (
    <div className="flex justify-items-end">
      <ul className="flex">
        {authors?.map((e) => (
          <li key={e.name}>
            <Collaborator name={e.name} avatar={e.avatar} />
          </li>
        ))}
      </ul>
      <ul className="ml-2 flex">
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
    </div>
  );
}
