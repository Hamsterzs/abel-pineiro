import { z } from "zod";
import { Album } from "@prisma/client";

type SortByOptions = keyof Pick<Album, "createdAt" | "rating">;

const sortByOptions: readonly SortByOptions[] = [
  "createdAt",
  "rating",
] as const;

export const artistsQueryValidator = z.object({
  sortBy: z
    .enum(
      sortByOptions as [(typeof sortByOptions)[number], ...typeof sortByOptions]
    )
    .catch("createdAt"),
  order: z.enum(["asc", "desc"]).catch("desc"),
});

export const DEFAULT_ARTIST_QUERY: ArtistQueryOut = {
  sortBy: "createdAt",
  order: "desc",
};

export type ArtistQueryIn = z.input<typeof artistsQueryValidator>;
export type ArtistQueryOut = z.infer<typeof artistsQueryValidator>;
