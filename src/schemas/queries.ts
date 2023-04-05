import { z } from "zod";
import { SongQueryValidator, DEFAULT_SONG_QUERY } from "../db/songs/validator";
import { albumQueryValidator } from "../db/albums/validator";
import { artistsQueryValidator } from "../db/artists/validator";

export const getValidator = z
  .union([
    z.object({ type: z.literal("songs"), query: SongQueryValidator }),
    z.object({ type: z.literal("albums"), query: albumQueryValidator }),
    z.object({ type: z.literal("artists"), query: artistsQueryValidator }),
  ])
  .catch({ type: "songs", query: DEFAULT_SONG_QUERY });

export type GetValidator = z.infer<typeof getValidator>;
export type GetValidatorIn = z.input<typeof getValidator>;
