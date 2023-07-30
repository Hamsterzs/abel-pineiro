import React from "react";
import MusicPage from "../../components/MusicPage";
import { GetValidatorIn } from "../../server/Music/schemas/music/getMusic";
import { getMusic } from "../../server/Music";
import getLastSongs from "../../server/Spotify/getLastSongs";
import { db } from "../../drizzle/db";
import { album, artist, image, song } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MusicData } from "../../server/Music/types/MusicData";

export const revalidate = 0;
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

  // return await getMusic({ type: urlQuery.type, query: query.query });
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

  const music = await getMusicProps({
    type,
    order,
    sortBy,
  });

  const myLastSongs = await getLastSongs();

  return <MusicPage music={music} myLastSongs={myLastSongs} />;
};

export default Page;
