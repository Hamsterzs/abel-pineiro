import React from "react";
import MusicList, { MusicPageProps } from "../../components/MusicPage";
import { db } from "../../../db/db";
import getCurrentTime from "../../utils/getCurrentTime";
import { unstable_cache } from "next/cache";

async function getMusic() {
  const songs = await db.query.song.findMany({
    columns: {
      id: true,
      title: true,
      rating: true,
    },
    with: {
      album: {
        columns: {
          id: true,
          title: true,
        },
        with: {
          image: {
            columns: {
              id: true,
              url: true,
            },
          },
        },
      },
      artist: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
  console.log("Getting music from DB");

  return { songs, dataFetchedAt: getCurrentTime() };
}

const cachedGetMusic = unstable_cache(getMusic, ["music"], { revalidate: 120 });

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ searchParams }: PageProps) => {
  console.log("Rendering music page " + searchParams);
  const { songs, dataFetchedAt } = await cachedGetMusic();

  const music: MusicPageProps["music"] = songs.map((song) => ({
    id: song.id,
    title: song.title,
    subTitle: song.artist.name,
    image: song.album.image?.url as string,
    rating: song.rating,
  }));

  return (
    <>
      <span className="absolute top-5 text-gray-600">
        Music fetched at {dataFetchedAt}
      </span>
      <MusicList music={music} baseRoute="/music" />
    </>
  );
};

export default Page;
