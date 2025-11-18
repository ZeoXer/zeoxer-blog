import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/", "page");
  return new Response(null, { status: 204 });
}
