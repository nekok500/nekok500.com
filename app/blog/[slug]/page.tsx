import { getClient } from "@/app/lib/client";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query<{
    launches: {
      id: string;
    }[];
  }>({
    query: gql`
      query GetLaunches {
        launches(limit: 100) {
          id
        }
      }
    `,
  });

  console.log(data);

  const paths = data.launches.map((launch) => ({
    slug: launch.id,
  }));

  console.log(paths);

  return [...paths];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query<{
    launch: {
      mission_name: string;
      details: string;
    };
  }>({
    query: gql`
      query GetLaunches($id: ID!) {
        launch(id: $id) {
          mission_name
          details
        }
      }
    `,
    variables: {
      id: params.slug,
    },
  });

  if (!data.launch) notFound();

  return (
    <div className="mx-auto py-6">
      <h1 className="text-4xl font-bold text-gray-900">
        {data.launch.mission_name}
      </h1>
      <p className="mt-2 leading-6">{data.launch.details}</p>
    </div>
  );
}
