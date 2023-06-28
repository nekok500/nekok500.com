import { gql } from "@apollo/client";
import { getClient } from "@/app/lib/client";

export default async function Page() {
  const client = getClient();
  const { data } = await client.query<{
    launches: {
      id: string;
      mission_name: string;
    }[];
  }>({
    query: gql`
      query GetLaunches {
        launches(limit: 10) {
          id
          mission_name
        }
      }
    `,
  });

  return (
    <div className="mx-auto py-6">
      {data.launches.map((launch) => (
        <a href={`blog/${launch.id}`} className="flex mx-auto">
          {launch.mission_name}
        </a>
      ))}
    </div>
  );
}
