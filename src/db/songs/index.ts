import prisma from "../../lib/prisma";
import { MusicData } from "../types";
import { SongQueryOut } from "./schema";

interface dbSongs {
  get: (query: SongQueryOut) => Promise<MusicData[]>;
}

class Songs implements dbSongs {
  get = async (query: SongQueryOut) => {
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
