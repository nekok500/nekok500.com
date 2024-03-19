import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import * as crypto from "crypto";

type RequestBody = {
  id: string | null | undefined;
  api: string;
};

export async function POST(request: Request): Promise<Response> {
  const bodyText = await request.text();
  const bodyBuffer = Buffer.from(bodyText, "utf-8");

  const { id, api: endpoint } = JSON.parse(bodyText) as RequestBody;
  if (!bodyText) {
    console.error("Body is empty.");
    return NextResponse.json({
      status: 400,
    });
  }

  const secret = process.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET;
  if (!secret) {
    console.error("Secret is empty.");
    return NextResponse.json({
      status: 500,
    });
  }

  const signature = request.headers.get("X-MICROCMS-Signature");
  if (!signature) {
    console.error("Signature is empty.");
    return NextResponse.json({
      status: 400,
    });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(bodyBuffer)
    .digest("hex");

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    console.error("Invalid signature.");
    return NextResponse.json({
      status: 400,
    });
  }

  if (endpoint === "tags" || endpoint === "categories") revalidateTag("blogs"); // タグ、カテゴリのリネーム等は全てパージ
  if (endpoint === "blogs") revalidateTag(`blogs/${id}`);

  return NextResponse.json({ message: "success" });
}

export async function GET(request: Request): Promise<Response> {
  revalidateTag(`blogs`);
  return NextResponse.json({ message: "purged blog caches" });
}
