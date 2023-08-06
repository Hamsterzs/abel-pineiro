// invalidate tag

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) return new Response("Missing tag", { status: 400 });

  revalidateTag(tag);

  return NextResponse.json({ tag });
}
