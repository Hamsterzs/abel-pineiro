import dbSongs from "../../../db/songs";
import { procedure, router } from "../trpc";
import dbAlbums from "../../../db/albums";
import { getValidator } from "../../Music/schemas/music/getMusic";
import { getMusic } from "../../Music";

export const musicRouter = router({
  get: procedure.input(getValidator).query(({ input }) => {
    return getMusic(input);
  }),
});

// export type definition of API
export type musicRouter = typeof musicRouter;
