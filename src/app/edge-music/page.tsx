import React, { Suspense } from "react";
import MusicPage from "../../components/MusicPage";
import LastSongs, { LastSongsLoader } from "../../components/LastSongs";
import getMusic from "../../server/getMusic";
import { z } from "zod";

export const runtime = "edge";
export const revalidate = false;

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

const Page = async () => {
  const LastSongsPromise = getLastSongs();
  const music = await getMusic();

  return (
    <MusicPage music={music.music}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs myLastSongsPromise={LastSongsPromise} />
      </Suspense>
      ;
    </MusicPage>
  );
};

export default Page;
