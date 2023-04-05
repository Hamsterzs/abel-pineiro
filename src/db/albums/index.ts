import prisma from "../../lib/prisma";
import { MusicData } from "../../server/Music/types/MusicData";
import { AlbumQueryOut } from "../../server/Music/schemas/albums/getAlbums";
import { DbAlbums } from "../../server/Music/types/DbAlbums";

const dbAlbums: DbAlbums = {
  get: async (query) => {
    const albums = await prisma.album.findMany({
      select: {
        id: true,
        title: true,
        artist: true,
        rating: true,
        image: true,
      },
      orderBy: {
        [query.sortBy]: query.order,
      },
    });

    return albums.map((album) => ({
      id: album.id,
      title: album.title,
      subTitle: album.artist.name,
      rating: album.rating,
      image: album.image.url,
    }));
  },
};

export default Object.freeze(dbAlbums);
