import dbSongs, { SongQueryValidator } from "../../db/songs";
import { procedure, router } from "../trpc";

export const songRouter = router({
  get: procedure.input(SongQueryValidator).query(({ input }) => {
    console.log("getting songs with ", input);
    return dbSongs.get(input);
  }),
});

// export type definition of API
export type SongRouter = typeof songRouter;
