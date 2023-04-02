import dbSongs from "../../db/songs";
import { SongQueryValidator } from "../../db/songs/validator";
import { procedure, router } from "../trpc";

export const songRouter = router({
  get: procedure.input(SongQueryValidator).query(({ input }) => {
    return dbSongs.get(input);
  }),
});

// export type definition of API
export type SongRouter = typeof songRouter;
