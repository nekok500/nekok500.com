import { toYYYYMMDD } from "@/libs/utils";
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "edge";

type RequestBody = {
  id: string | null | undefined;
  api: string;
  contents?: {
    new: {
      id: string;
      draftValue?: {
        createdAt: string;
      };
      publishValue?: {
        createdAt: string;
      };
    };
    old: {
      id: string;
      draftValue?: {
        createdAt: string;
      };
      publishValue?: {
        createdAt: string;
      };
    };
  };
};

export async function POST(request: Request): Promise<Response> {
  const bodyText = await request.text();
  const bodyBuffer = Buffer.from(bodyText, "utf-8");

  const { id, api: endpoint, contents } = JSON.parse(bodyText) as RequestBody;
  if (!bodyText) {
    console.error("Body is empty.");
    return NextResponse.json({
      status: 400,
    });
  }

  const secret =
    getOptionalRequestContext()?.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET ||
    process.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET!;

  if (!secret) {
    return NextResponse.json({
      status: 401,
      message: "secret is missing",
    });
  }

  const signature = request.headers.get("X-MICROCMS-Signature");
  if (!signature) {
    return NextResponse.json({
      status: 401,
      message: "signature is missing",
    });
  }

  const enc = new TextEncoder();
  const alg = { name: "HMAC", hash: "SHA-256" };
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    alg,
    false,
    ["verify"]
  );

  if (
    !(await crypto.subtle.verify(
      alg,
      key,
      Buffer.from(signature, "hex"),
      bodyBuffer
    ))
  )
    return NextResponse.json({
      status: 401,
      message: "signature is invalid",
    });

  if (endpoint === "tags" || endpoint === "categories") revalidateTag("blogs"); // タグ、カテゴリのリネーム等は全てパージ
  if (endpoint === "blogs") {
    const slug = `${toYYYYMMDD(
      contents?.new.publishValue?.createdAt ||
        contents?.new.draftValue?.createdAt ||
        contents?.old.publishValue?.createdAt ||
        contents?.old.draftValue?.createdAt!
    )}-${id}`;

    console.log(`removeing page cache: /blogs/${slug}`);
    revalidatePath(`/blogs/${slug}`, "page");
    console.log(`removeing tag cache: /blogs/${id}`);
    revalidateTag(`/blogs/${id}`);
  }

  return NextResponse.json({ message: "success" });
}

export async function GET(request: Request): Promise<Response> {
  revalidateTag(`blogs`);
  return NextResponse.json({ message: "blog tag cache removed" });
}
