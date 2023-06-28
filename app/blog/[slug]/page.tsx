"use client";

import { getClient } from "@/app/lib/client";
import { gql } from "@apollo/client";

export const runtime = "edge";

export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query<{
    launches: {
      id: string;
      mission_name: string;
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

  return data.launches.map((launch) => {
    slug: launch.id;
  });
}

export default async function Page() {
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
  });

  return (
    <div className="mx-auto py-6">
      <h1 className="text-4xl font-bold text-gray-900">
        {data.launch.mission_name}
      </h1>
      <p className="mt-2 leading-6">{data.launch.details}</p>
    </div>
  );
}
