import React, { Suspense } from "react";
import MusicList, { MusicPageProps } from "../../components/MusicPage";
import LastSongs, { LastSongsLoader } from "../../components/LastSongs";
import getLastSongs from "../../Entities/Spotify/getLastSongs";
import Head from "next/head";
import db from "../../../db/dbServerless";

export const revalidate = 0;

async function getMusic() {
  const songs = await db.query.song.findMany({
    columns: {
      id: true,
      title: true,
      rating: true,
    },
    with: {
      album: {
        columns: {
          id: true,
          title: true,
        },
        with: {
          image: {
            columns: {
              id: true,
              url: true,
            },
          },
        },
      },
      artist: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });

  return { songs, dataFetchedAt: new Date().toLocaleTimeString() };
}

export const runtime = "edge";

const Page = async () => {
  const LastSongsPromise = getLastSongs();

  const { songs, dataFetchedAt } = await getMusic();

  const music: MusicPageProps["music"] = songs.map((song) => ({
    id: song.id,
    title: song.title,
    subTitle: song.artist.name,
    image: song.album.image?.url as string,
    rating: song.rating,
  }));

  return (
    <div className={`h-screen w-screen overflow-hidden bg-gray-200 pt-6`}>
      <span className="absolute text-gray-600">{dataFetchedAt}</span>
      <Head>
        <title>Music</title>
        <meta
          name="description"
          content="Abel Pineiro's favorite Songs, Artists and Albums."
        />
      </Head>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs myLastSongsPromise={LastSongsPromise} />
      </Suspense>
      <MusicList music={music} baseRoute="/edge"></MusicList>
    </div>
  );
};

export default Page;
