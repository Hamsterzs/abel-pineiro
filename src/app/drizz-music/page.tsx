import React, { Suspense } from "react";
import MusicPage from "../../components/MusicPage";
import LastSongs, { LastSongsLoader } from "../../components/LastSongs";
import getLastSongs from "../../utils/getLastSongs";
import getMusic from "../../server/getMusic";

const Page = async () => {
  const lastSongsPromise = getLastSongs();
  const music = await getMusic();

  return (
    <MusicPage music={music}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs myLastSongsPromise={lastSongsPromise} />
      </Suspense>
    </MusicPage>
  );
};

export default Page;
