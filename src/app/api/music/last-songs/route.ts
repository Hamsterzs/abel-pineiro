import { NextResponse } from "next/server";
import getLastSongs from "../../../../utils/getLastSongs";

export const revalidate = 60;

export async function GET() {
  const lastSongs = await getLastSongs();

  return NextResponse.json(lastSongs);
}
