import { revalidateTag } from "next/cache";

export const runtime = "edge";

export default function Page() {
  revalidateTag("test");

  return <span>purged</span>;
}
