import React from "react";
import MusicPage from "../../components/MusicPageDrizz";
import getMusic from "../../server/getMusic";

export const revalidate = false;
export const dynamic = "force-static";

const Page = async () => {
  const music = await getMusic();

  return <MusicPage music={music} />;
};

export default Page;
