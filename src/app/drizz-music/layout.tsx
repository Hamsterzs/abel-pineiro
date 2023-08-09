import React from "react";
import { z } from "zod";
import LastSongsClient from "../../components/LastSongsDrizz";

async function getLastSongs() {
  try {
    const baseUrl = process.env.BASE_URL;

    const res = await fetch(baseUrl + "/api/music/last-songs", {
      next: {
        revalidate: 120,
      },
    });

    const data = await res.json();

    const lastSongsSchema = z.array(
      z.object({
        song: z.string(),
        artist: z.string(),
      })
    );

    const lastSongs = lastSongsSchema.parse(data);

    return lastSongs;
  } catch (error) {
    return [];
  }
}

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const lastSongs = await getLastSongs();

  return (
    <div className={`h-screen w-screen overflow-hidden bg-gray-200 pt-6`}>
      <LastSongsClient myLastSongs={lastSongs} />
      {children}
    </div>
  );
};

export default Layout;
