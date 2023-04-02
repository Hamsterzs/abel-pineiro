import prisma from "../lib/prisma";
import { z } from "zod";
import { Song } from "@prisma/client";

type SortByOptions = keyof Pick<Song, "createdAt" | "rating">;

const sortByOptions: readonly SortByOptions[] = [
  "createdAt",
  "rating",
] as const;

export const SongQueryValidator = z.object({
  sortBy: z.enum(
    sortByOptions as [(typeof sortByOptions)[number], ...typeof sortByOptions]
  ),
  order: z.enum(["asc", "desc"]),
});

export type SongQuery = z.infer<typeof SongQueryValidator>;

export const DEFAULT_SONG_QUERY: SongQuery = {
  sortBy: "createdAt",
  order: "desc",
};

export type MusicData = {
  id: string;
  title: string;
  subTitle: string;
  rating: number;
  image: string;
};

class Songs {
  get: (query: SongQuery) => Promise<MusicData[]> = async (query) => {
    const songs = await prisma.song.findMany({
      include: {
        artist: {
          select: {
            name: true,
          },
        },
        album: {
          include: {
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
      orderBy: {
        [query.sortBy]: query.order,
      },
    });

    return songs.map((song) => ({
      id: song.id,
      title: song.title,
      subTitle: song.artist.name,
      rating: song.rating,
      image: song.album.image.url,
    }));
  };
}

const dbSongs = new Songs();

export default dbSongs;
