import { z } from "zod";

const sortByOptions = ["createdAt", "rating"] as const;

export const SongQueryValidator = z.object({
  sortBy: z.enum(sortByOptions).catch("createdAt"),
  order: z.enum(["asc", "desc"]).catch("desc"),
});

export type SongQueryIn = z.input<typeof SongQueryValidator>;
export type SongQueryOut = z.infer<typeof SongQueryValidator>;
