import { z } from "zod";
import { db } from "../drizzle/db";
import { spotify } from "../drizzle/schema";
import getRefreshToken from "../server/Spotify/getRefreshToken";
import { cache } from "react";

const getLastSongsUnMemoized = async () => {
  const tokens = await db.select().from(spotify).limit(1);
  const token = tokens[0];

  if (!token) throw "Error with spotify tokens";

  const { accessToken } = token;

  const url =
    "https://api.spotify.com/v1/me/player/recently-played?limit=10&before=" +
    Date.now();

  let response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    const tokens = await getRefreshToken();

    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  }

  const data = await response.json();

  const { items } = data;

  const dataParser = z.array(
    z.object({
      track: z.object({
        name: z.string(),
        artists: z.array(z.object({ name: z.string() })),
      }),
    })
  );

  const newData = dataParser.safeParse(items);

  if (!newData.success) return [];

  const betterData = newData.data.map((song) => ({
    song: song.track.name,
    artist: song.track.artists[0].name,
  }));

  return betterData;
};

const getLastSongs = cache(getLastSongsUnMemoized);

export default getLastSongs;
