import React, { Suspense } from "react";
import MusicPage from "../../../components/MusicPage";
import { db } from "../../../drizzle/db";
import { album, artist, image, song } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MusicData } from "../../../server/Music/types/MusicData";
import LastSongs, { LastSongsLoader } from "../../../components/LastSongs";
import getLastSongs from "../../../server/Spotify/getLastSongs";

export const revalidate = 120;
export const runtime = "edge";

const getMusicProps = async () => {
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

  return musicData;
};

const Page = async () => {
  const LastSongsPromise = getLastSongs();

  const music = await getMusicProps();

  return (
    <MusicPage music={music}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs myLastSongsPromise={LastSongsPromise} />
      </Suspense>
      ;
    </MusicPage>
  );
};

export default Page;
