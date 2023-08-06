import React, { Suspense } from "react";
import MusicPage from "../../components/MusicPage";
import LastSongs, { LastSongsLoader } from "../../components/LastSongs";
import getMusic from "../../server/getMusic";
import { z } from "zod";

export const revalidate = 1000;

async function getLastSongs() {
  const baseUrl = process.env.BASE_URL;

  const res = await fetch(baseUrl + "/api/music/last-songs", {
    next: {
      revalidate: 20,
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
}

const Page = async () => {
  const lastSongs = getLastSongs();
  const music = await getMusic();

  return (
    <MusicPage music={music}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs myLastSongsPromise={lastSongs} />
      </Suspense>
    </MusicPage>
  );
};

export default Page;
