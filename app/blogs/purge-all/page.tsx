import { revalidatePath } from "next/cache";

export const runtime = "edge";

export default function PurgeAll() {
  revalidatePath("/blogs");
  return <span>purged</span>;
}
