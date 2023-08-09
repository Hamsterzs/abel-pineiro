import React from "react";
import MusicPage from "../../components/MusicPageDrizz";
import getMusic from "../../server/getMusic";
import { z } from "zod";
import { unstable_cache } from "next/cache";

export const fetchCache = "default-no-store";

const Page = async () => {
  const getMusicCached = unstable_cache(getMusic, ["music-key"], {
    tags: ["music-tag"],
    revalidate: false,
  });

  const lastSongs = getLastSongs();
  const music = await getMusicCached();

  return <MusicPage music={music} />;
};

export default Page;
