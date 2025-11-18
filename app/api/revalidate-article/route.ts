import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (id) {
    revalidatePath(`/article/${id}`, "page");
  }

  return new Response(null, { status: 204 });
}
