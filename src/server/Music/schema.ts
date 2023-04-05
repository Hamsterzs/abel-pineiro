import { z } from "zod";
import { SongQueryValidator } from "../../db/songs/schema";
import { albumQueryValidator } from "../../db/albums/schema";
import { artistsQueryValidator } from "../../db/artists/schema";

export const getValidator = z
  .union([
    z.object({ type: z.literal("songs"), query: SongQueryValidator }),
    z.object({ type: z.literal("albums"), query: albumQueryValidator }),
    z.object({ type: z.literal("artists"), query: artistsQueryValidator }),
  ])
  .catch({ type: "songs", query: { order: "desc", sortBy: "createdAt" } });

export type GetValidator = z.infer<typeof getValidator>;
export type GetValidatorIn = z.input<typeof getValidator>;
