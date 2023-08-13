import React from "react";
import { db } from "../../drizzle/db";
import { album, artist, image, song } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MusicData } from "../../server/Music/types/MusicData";
import MusicPage from "../../components/MusicPageDrizz";

export const revalidate = 20;
export const fetchCache = "force-no-store";

const getMusic = async () => {
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

  const musicData: { dateFetched: string; music: MusicData[] } = {
    dateFetched: new Date().toISOString(),
    music: songs.map(
      (song) =>
        ({
          id: song.id,
          image: song.image,
          rating: song.rating,
          title: song.name,
          subTitle: song.artist,
        } as MusicData)
    ),
  };

  return musicData;
};

const Page = async () => {
  const musicData = await getMusic();

  const dateFetched = new Date(musicData.dateFetched);

  return (
    <>
      <h1>
        {dateFetched.toDateString()} {dateFetched.toTimeString()}
      </h1>
      <MusicPage music={musicData.music} />
    </>
  );
};

export default Page;
