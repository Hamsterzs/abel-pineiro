import dbSongs from "../../../db/songs";
import { procedure, router } from "../trpc";
import dbAlbums from "../../../db/albums";
import { getValidator } from "../../Music/schemas/music/getMusic";
import { getMusic } from "../../Music";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const musicRouter = router({
  get: procedure.input(getValidator).query(({ input }) => {
    return getMusic(input);
  }),
  myLastSongs: procedure.query(async () => {
    const tokens = await prisma.spotify.findFirst();

    if (!tokens) throw "Error with spotify tokens";

    const { accessToken } = tokens;

    const url =
      "https://api.spotify.com/v1/me/player/recently-played?limit=10&before=" +
      Date.now();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
  }),
});

// export type definition of API
export type musicRouter = typeof musicRouter;
