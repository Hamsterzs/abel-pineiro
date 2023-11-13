import { z } from "zod";

const sortByOptions = ["createdAt", "rating"] as const;

export const albumQueryValidator = z.object({
  sortBy: z.enum(sortByOptions).catch("createdAt"),
  order: z.enum(["asc", "desc"]).catch("desc"),
});

export type AlbumQueryIn = z.input<typeof albumQueryValidator>;
export type AlbumQueryOut = z.infer<typeof albumQueryValidator>;
