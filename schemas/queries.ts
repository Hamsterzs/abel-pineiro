import { z } from "zod";
import { SongQueryValidator, DEFAULT_SONG_QUERY } from "../db/songs/validator";
import { albumQueryValidator } from "../db/albums/validator";

export const getValidator = z
  .union([
    z.object({ type: z.literal("songs"), query: SongQueryValidator }),
    z.object({ type: z.literal("albums"), query: albumQueryValidator }),
  ])
  .catch({ type: "songs", query: DEFAULT_SONG_QUERY });

export type GetValidator = z.infer<typeof getValidator>;
