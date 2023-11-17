import { z } from "zod";
import { db } from "../../../db/db";
import { spotify } from "../../../db/schema";
import getRefreshToken from "./getRefreshToken";
import getCurrentTime from "../../utils/getCurrentTime";

const getLastSongs = async () => {
  const tokens = await db.select().from(spotify).limit(1);
  const [token] = tokens;

  if (!token) throw "Error with spotify tokens";

  const { accessToken } = token;

  const url = `https://api.spotify.com/v1/me/player/recently-played?limit=10&before=${Date.now()}`;

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
    }),
  );

  const newData = dataParser.safeParse(items);

  if (!newData.success) return { data: [], dataFetchedAt: "" };

  const betterData = newData.data.map((song) => ({
    song: song.track.name,
    artist: song.track.artists[0].name,
  }));
  console.log("Fetching last songs from Spotify");

  return { data: betterData, dataFetchedAt: getCurrentTime() };
};

export default getLastSongs;
