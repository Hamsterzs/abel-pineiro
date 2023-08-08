import { NextResponse } from "next/server";
import getLastSongs from "../../../../utils/getLastSongs";

export async function GET() {
  const lastSongs = await getLastSongs();

  return NextResponse.json(lastSongs);
}
