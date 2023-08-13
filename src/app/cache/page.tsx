import React from "react";
import { db } from "../../drizzle/db";
import { album, artist, image, song } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import MusicPage from "../../components/MusicPageDrizz";
import getMusic from "../../utils/getCacheMusic";

export const revalidate = 20;

const Page = async () => {
  const musicData = await getMusic();
  const dateFetched = new Date(musicData.dateFetched);

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
