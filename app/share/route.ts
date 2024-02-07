import { db } from "@/lib/db";
import { createId } from "@paralleldrive/cuid2";

export const runtime = "edge";

export async function POST(req: Request) {
    const { code }: { code: string } = await req.json();

    const prev = await db.from("playground").select().eq("code", code);

    if (prev.status == 200 && prev.data?.length! > 0)
        return Response.json({ data: prev.data![0], result: true, message: "success" });

    const id = createId();

    await db.from("playground").insert({ id, code });

    return Response.json({ data: { code, id }, result: true, message: "success" });
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { status, data } = await db.from("playground").select().eq("id", id);

    if (status != 200 || data?.length! < 1)
        return Response.json({ data: null, result: false, message: "id not found" });

    return Response.json({ data: data![0], result: true, message: "success" });
}
