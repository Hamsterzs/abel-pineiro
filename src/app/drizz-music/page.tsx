import React, { Suspense } from "react";
import MusicPage from "../../components/MusicPage";
import LastSongs, { LastSongsLoader } from "../../components/LastSongs";
import getMusic from "../../server/getMusic";
import { z } from "zod";
import { unstable_cache } from "next/cache";

export const fetchCache = "default-no-store";

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
  const getMusicCached = unstable_cache(getMusic, ["music-key"], {
    tags: ["music-tag"],
    revalidate: false,
  });

  const lastSongs = getLastSongs();
  const music = await getMusicCached();

  return (
    <MusicPage music={music}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs myLastSongsPromise={lastSongs} />
      </Suspense>
    </MusicPage>
  );
};

export default Page;
