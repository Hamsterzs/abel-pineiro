import dbSongs from "../../../db/songs";
import { procedure, router } from "../trpc";
import dbAlbums from "../../../db/albums";
import { getValidator } from "../../Music/schemas/music/getMusic";
import { getMusic } from "../../Music";
import { z } from "zod";

export const musicRouter = router({
  get: procedure.input(getValidator).query(({ input }) => {
    return getMusic(input);
  }),
  myLastSongs: procedure.query(async () => {
    const url =
      "https://api.spotify.com/v1/me/player/recently-played?limit=10&before=" +
      Date.now();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
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
