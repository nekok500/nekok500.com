import { revalidatePath } from "next/cache";

export default function PurgeAll() {
  revalidatePath("/blogs");
  return <span>purged</span>;
}
