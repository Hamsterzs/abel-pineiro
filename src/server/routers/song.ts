import dbSongs from "../../db/songs";
import { procedure, router } from "../trpc";
import dbAlbums from "../../db/albums";
import { getValidator } from "../../schemas/queries";
import { getMusic } from "../getMusic";

export const musicRouter = router({
  get: procedure.input(getValidator).query(({ input }) => {
    return getMusic(input);
  }),
});

// export type definition of API
export type musicRouter = typeof musicRouter;
