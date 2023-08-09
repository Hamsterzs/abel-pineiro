import React from "react";
import MusicPage from "../../components/MusicPageDrizz";
import { unstable_cache } from "next/cache";
import getLastSongs from "../../utils/getLastSongs";
import { db } from "../../drizzle/db";
import { album, artist, image, song } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MusicData } from "../../server/Music/types/MusicData";

export const fetchCache = "default-no-store";

const getMusic = async () => {
  // return [
  //   {
  //     id: "1",
  //     image: "/black-parade.jpg",
  //     rating: 5,
  //     title: "Song " + Math.random(),
  //     subTitle: "Artist " + Math.random(),
  //   },
  // ];
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
  const music = await unstable_cache(getMusic, ["music-key"], {
    tags: ["music-tag"],
    revalidate: false,
  })();

  const lastSongs = getLastSongs();

  return <MusicPage music={music} />;
};

export default Page;
