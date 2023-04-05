import { z } from "zod";
import { SongQueryValidator } from "../songs/getSongs";
import { albumQueryValidator } from "../albums/getAlbums";
import { artistsQueryValidator } from "../artists/getArtists";

export const getValidator = z
  .union([
    z.object({ type: z.literal("songs"), query: SongQueryValidator }),
    z.object({ type: z.literal("albums"), query: albumQueryValidator }),
    z.object({ type: z.literal("artists"), query: artistsQueryValidator }),
  ])
  .catch({ type: "songs", query: { order: "desc", sortBy: "createdAt" } });

export type GetValidator = z.infer<typeof getValidator>;
export type GetValidatorIn = z.input<typeof getValidator>;
