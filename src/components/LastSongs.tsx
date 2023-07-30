import React from "react";
import getLastSongs from "../server/Spotify/getLastSongs";
import LastSongsClient from "./LastSongsClient";

const LastSongs = async () => {
  const myLastSongs = await getLastSongs();

  return <LastSongsClient myLastSongs={myLastSongs} isLoading={false} />;
};

export default LastSongs;
