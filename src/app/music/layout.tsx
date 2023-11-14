import Head from "next/head";
import React from "react";
import getLastSongs from "../../Entities/Spotify/getLastSongs";
import LastSongsClient from "../../components/LastSongs";
import { unstable_cache } from "next/cache";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const { data: myLastSongs, dataFetchedAt } = await unstable_cache(
    getLastSongs,
    ["lastSongs"],
    { revalidate: 300 }
  )();
  return (
    <div className={`h-screen w-screen overflow-hidden bg-gray-200 pt-6`}>
      <Head>
        <title>Music</title>
        <meta
          name="description"
          content="Abel Pineiro's favorite Songs, Artists and Albums."
        />
      </Head>
      <span className=" absolute top-0 text-gray-600 ">
        Spotify fetched at {dataFetchedAt}
      </span>
      <LastSongsClient myLastSongs={myLastSongs} />
      {children}
    </div>
  );
};

export default Layout;
