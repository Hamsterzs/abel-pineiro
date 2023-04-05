import { z } from "zod";
import { Song } from "@prisma/client";

type SortByOptions = keyof Pick<Song, "createdAt" | "rating">;

const sortByOptions: readonly SortByOptions[] = [
  "createdAt",
  "rating",
] as const;

export const SongQueryValidator = z.object({
  sortBy: z
    .enum(
      sortByOptions as [(typeof sortByOptions)[number], ...typeof sortByOptions]
    )
    .catch("createdAt"),
  order: z.enum(["asc", "desc"]).catch("desc"),
});

export type SongQueryIn = z.input<typeof SongQueryValidator>;
export type SongQueryOut = z.infer<typeof SongQueryValidator>;
