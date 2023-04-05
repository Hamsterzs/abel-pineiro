import { z } from "zod";
import { ModelArtist } from "../../../../db/Models";

type SortByOptions = keyof Pick<ModelArtist, "createdAt" | "rating">;

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

export type ArtistQueryIn = z.input<typeof artistsQueryValidator>;
export type ArtistQueryOut = z.infer<typeof artistsQueryValidator>;
