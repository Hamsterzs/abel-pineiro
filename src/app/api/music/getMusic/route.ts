import { NextResponse } from "next/server";
import { db } from "../../../../drizzle/db";
import { album, artist, image, song } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MusicData } from "../../../../server/Music/types/MusicData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const songs = await db
    .select({
      id: song.id,
      name: song.title,
      artist: artist.name,
      image: image.url,
      rating: song.rating,
    })
    .from(song)
    .leftJoin(artist, eq(song.artistId, artist.id))
    .leftJoin(album, eq(song.albumId, album.id))
    .leftJoin(image, eq(album.imageId, image.id));

  const musicData: MusicData[] = songs.map(
    (song) =>
      ({
        id: song.id,
        image: song.image,
        rating: song.rating,
        title: song.name,
        subTitle: song.artist,
      } as MusicData)
  );

  return NextResponse.json(musicData);
}
