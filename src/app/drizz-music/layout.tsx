import React, { Suspense } from "react";
import LastSongsClient, { LastSongsLoader } from "../../components/LastSongs";
import { z } from "zod";

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

const Layout = ({ children }: Props) => {
  const lastSongs = getLastSongs();

  return (
    <div className={`h-screen w-screen overflow-hidden bg-gray-200 pt-6`}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongsClient myLastSongsPromise={lastSongs} />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
