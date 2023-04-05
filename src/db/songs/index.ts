import prisma from "../../lib/prisma";
import { DbSongs } from "../../server/Music/types/DbSongs";

const dbSongs: DbSongs = {
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
