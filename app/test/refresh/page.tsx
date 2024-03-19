import { revalidateTag } from "next/cache";

export const runtime = "edge";

export default function Page() {
  revalidateTag("blogs/hello-world");

  return <span>purged</span>;
}
