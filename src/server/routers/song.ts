import dbSongs from "../../db/songs";
import { procedure, router } from "../trpc";
import dbAlbums from "../../db/albums";
import { getValidator } from "../../schemas/queries";

export const musicRouter = router({
  get: procedure.input(getValidator).query(({ input }) => {
    if (input.type === "albums") return dbAlbums.get(input.query);

    return dbSongs.get(input.query);
  }),
});

// export type definition of API
export type musicRouter = typeof musicRouter;
