import { NextResponse } from "next/server";
import getLastSongs from "../../../../utils/getLastSongs";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  const lastSongs = await getLastSongs();

  return NextResponse.json(lastSongs);
}
