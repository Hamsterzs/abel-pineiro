import prisma from "../../lib/prisma";
import { MusicData } from "../types";
import { SongQueryOut } from "./schema";

interface dbSongs {
  get: (query: SongQueryOut) => Promise<MusicData[]>;
}

const dbSongs: dbSongs = {
  get: async (query) => {
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
  },
};

export default Object.freeze(dbSongs);
