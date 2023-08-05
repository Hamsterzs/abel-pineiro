import React, { Suspense } from "react";
import MusicPage from "../../../components/MusicPage";
import { db } from "../../../drizzle/db";
import { album, artist, image, song } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MusicData } from "../../../server/Music/types/MusicData";
import LastSongs, { LastSongsLoader } from "../../../components/LastSongs";
import getLastSongs from "../../../server/Spotify/getLastSongs";

export const revalidate = 20;
export const runtime = "edge";

const getMusicProps = async (urlQuery: {
  type: string;
  sortBy: string;
  order: string;
}) => {
  const query = {
    type: urlQuery.type,
    query: {
      sortBy: urlQuery.sortBy,
      order: urlQuery.order,
    },
  };

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

const Page = async ({ searchParams }: any) => {
  const { type, sortBy, order } = searchParams;

  const LastSongsPromise = getLastSongs();

  const music = await getMusicProps({
    type,
    order,
    sortBy,
  });

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
