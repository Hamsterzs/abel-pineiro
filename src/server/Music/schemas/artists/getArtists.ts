import { z } from "zod";

const sortByOptions = ["createdAt", "rating"] as const;

export const artistsQueryValidator = z.object({
  sortBy: z.enum(sortByOptions).catch("createdAt"),
  order: z.enum(["asc", "desc"]).catch("desc"),
});

export type ArtistQueryIn = z.input<typeof artistsQueryValidator>;
export type ArtistQueryOut = z.infer<typeof artistsQueryValidator>;
