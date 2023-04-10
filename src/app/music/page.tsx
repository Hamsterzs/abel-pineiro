import React from "react";
import MusicPage from "../../components/MusicPage";
import { GetValidatorIn } from "../../server/Music/schemas/music/getMusic";
import { getMusic } from "../../server/Music";
import getLastSongs from "../../server/Spotify/getLastSongs";

const getMusicProps = async (urlQuery: {
  type: string;
  sortBy: string;
  order: string;
}) => {
  const query: GetValidatorIn = {
    type: urlQuery.type,
    query: {
      sortBy: urlQuery.sortBy,
      order: urlQuery.order,
    },
  };

  return await getMusic({ type: urlQuery.type, query });
};

const Page = async ({ searchParams }: { searchParams: any }) => {
  const { type, sortBy, order } = searchParams;

  const music = await getMusicProps({
    order: order,
    sortBy: sortBy,
    type: type,
  });

  const myLastSongs = await getLastSongs();

  return <MusicPage music={music} myLastSongs={myLastSongs} />;
};

export default Page;
