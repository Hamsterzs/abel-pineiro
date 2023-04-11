import { z } from "zod";
import { ModelAlbum } from "../../../../db/Models";

type SortByOptions = keyof Pick<ModelAlbum, "createdAt" | "rating">;

const sortByOptions: readonly SortByOptions[] = [
  "createdAt",
  "rating",
] as const;

export const albumQueryValidator = z.object({
  sortBy: z
    .enum(
      sortByOptions as [(typeof sortByOptions)[number], ...typeof sortByOptions]
    )
    .catch("createdAt"),
  order: z.enum(["asc", "desc"]).catch("desc"),
});

export type AlbumQueryIn = z.input<typeof albumQueryValidator>;
export type AlbumQueryOut = z.infer<typeof albumQueryValidator>;