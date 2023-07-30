import React from "react";
import MusicPage from "../../components/MusicPage";
import { getMusic } from "../../server/Music";
import getLastSongs from "../../server/Spotify/getLastSongs";

export const revalidate = 0;

const getMusicProps = async (urlQuery: {
  type: string;
  sortBy: string;
  order: string;
}) => {
  const query = {
    type: urlQuery.type,
    query: {
      sortBy: urlQuery.sortBy,
      order: urlQuery.order,
    },
  };

  return await getMusic({ type: urlQuery.type, query: query.query });
};

const Page = async ({ searchParams }: any) => {
  const { type, sortBy, order } = searchParams;

  const music = await getMusicProps({
    type,
    order,
    sortBy,
  });

  const myLastSongs = await getLastSongs();

  return <MusicPage music={music} myLastSongs={myLastSongs} />;
};

export default Page;
