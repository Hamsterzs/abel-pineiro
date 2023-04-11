import { z } from "zod";
import prisma from "../../lib/prisma";
import getRefreshToken from "./getRefreshToken";

const getLastSongs = async () => {
  const tokens = await prisma.spotify.findFirst();

  if (!tokens) throw "Error with spotify tokens";

  const { accessToken } = tokens;

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
    next: {
      revalidate: 60 * 2,
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

  if (!newData.success) return;

  const betterData = newData.data.map((song) => ({
    song: song.track.name,
    artist: song.track.artists[0].name,
  }));

  return betterData;
};

export default getLastSongs;