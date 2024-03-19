export const runtime = "edge";
export const revalidate = 60;

type Response = {
  datetime: string;
};

export default async function Page() {
  const data = (await (
    await fetch("https://worldtimeapi.org/api/timezone/asia/tokyo")
  ).json()) as Response;

  return <h1>{data.datetime}</h1>;
}
