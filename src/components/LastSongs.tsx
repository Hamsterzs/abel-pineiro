import React from "react";
import getLastSongs from "../server/Spotify/getLastSongs";
import LastSongsClient from "./LastSongsClient";

const LastSongs = async () => {
  const myLastSongs = getLastSongs();

  return <LastSongsClient myLastSongsPromise={myLastSongs} />;
};

export default LastSongs;
