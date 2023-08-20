import React from "react";
import MusicPage from "../../components/MusicPageDrizz";
import { unstable_cache } from "next/cache";
import cachedGetMusic from "../../server/getMusic";

export const dynamic = "force-dynamic";

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
        {dateFetched.toLocaleDateString("en-GB", {
          timeZone: "America/Mexico_City",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}{" "}
      </h1>
      <MusicPage music={musicData.music} />
    </>
  );
};

export default Page;
