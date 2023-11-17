import React from "react";
import { db } from "../../../db/db";
import { song } from "../../../db/schema";

const getSong = async () => {
  return db.select().from(song).limit(1);
};

export const dynamic = "force-dynamic";
export const revalidate = 20;

const Page = async () => {
  const songs = await getSong();
  const [song] = songs;

  return (
    <div>
      <h1>{song.title}</h1>
    </div>
  );
};

export default Page;
