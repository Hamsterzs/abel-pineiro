import React from "react";
import MusicPage from "../../components/MusicPageDrizz";
import { unstable_cache } from "next/cache";
import { db } from "../../drizzle/dbServerless";
import { album, artist, image, song } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MusicData } from "../../server/Music/types/MusicData";

const getMusic = async () => {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(baseUrl + "/api/music/getMusic", {
    next: { revalidate: false, tags: ["MusicData"] },
  });
  const data = (await res.json()) as MusicData[];

  return data;
};

const Page = async () => {
  const music = await getMusic().catch((err) => []);

  return <MusicPage music={music} />;
};

export default Page;
