"use server";
export const runtime = "edge";

import { notFound } from "next/navigation";
import { getClient } from "@/app/lib/client";
import { gql } from "@apollo/client";

export async function generateStaticParams() {
  "use server";

  const resp = await getClient().query<{
    posts: {
      nodes: {
        slug: string;
      }[];
    };
  }>({
    query: gql`
      query Posts {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return resp.data.posts.nodes.map((post) => ({ slug: post.slug }));
}

export const revalidate = 5;

interface PostResult {
  post: {
    title: string;
    slug: string;
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query<PostResult>({
    query: gql`
      query Post($slug: ID!) {
        post(idType: SLUG, id: $slug) {
          title
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
    context: {},
  });

  if (!data.post) notFound();

  return (
    <main>
      <div className="mx-auto py-6">
        <h2 className="text-gray-900 text-3xl font-bold">{data.post.title}</h2>
      </div>
    </main>
  );
}
