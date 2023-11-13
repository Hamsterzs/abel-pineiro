import React, { Suspense } from "react";
import MusicList from "../../components/MusicPage";
import LastSongs, { LastSongsLoader } from "../../components/LastSongs";
import getLastSongs from "../../Entities/Spotify/getLastSongs";
import Head from "next/head";
import Songs from "../../Entities/Music/Songs";

export const revalidate = 0;

const Page = async () => {
  const LastSongsPromise = getLastSongs();

  const songs = new Songs();
  const music = await songs.list();

  return (
    <div className={`h-screen w-screen overflow-hidden bg-gray-200 pt-6`}>
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
      <MusicList music={music}></MusicList>
    </div>
  );
};

export default Page;
