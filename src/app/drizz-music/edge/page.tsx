import React, { Suspense } from "react";
import MusicPage from "../../../components/MusicPage";
import { db } from "../../../drizzle/db";
import LastSongs, { LastSongsLoader } from "../../../components/LastSongs";
import getLastSongs from "../../../server/Spotify/getLastSongs";
import getMusic from "../../../server/getMusic";

export const runtime = "edge";

const Page = async () => {
  const LastSongsPromise = getLastSongs();

  const music = await getMusic();

  return (
    <MusicPage music={music}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs myLastSongsPromise={LastSongsPromise} />
      </Suspense>
      ;
    </MusicPage>
  );
};

export default Page;
