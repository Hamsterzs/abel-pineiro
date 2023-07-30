import React, { Suspense } from "react";
import MusicPage from "../../components/MusicPage";
import { getMusic } from "../../server/Music";
import { LastSongsLoader } from "../../components/LastSongsClient";
import LastSongs from "../../components/LastSongs";

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

  return (
    <MusicPage music={music}>
      <Suspense fallback={<LastSongsLoader />}>
        <LastSongs />
      </Suspense>
      ;
    </MusicPage>
  );
};

export default Page;
