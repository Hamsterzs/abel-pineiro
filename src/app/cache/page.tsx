import React from "react";
import MusicPage from "../../components/MusicPageDrizz";
import { unstable_cache } from "next/cache";
import cachedGetMusic from "../../server/getMusic";

const Page = async () => {
  const getMusicData = unstable_cache(cachedGetMusic, ["MusicData"], {
    revalidate: 20,
    tags: ["MusicData"],
  });

  const musicData = await getMusicData();
  const dateFetched = new Date(musicData.dateFetched || "12/12/2020");

  return (
    <>
      <h1>
        {dateFetched.toDateString()} {dateFetched.toTimeString()}
      </h1>
      <MusicPage music={musicData.music} />
    </>
  );
};

export default Page;
