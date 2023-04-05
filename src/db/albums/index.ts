import prisma from "../../lib/prisma";
import { MusicData } from "../types";
import { AlbumQueryOut } from "./schema";

interface dbAlbums {
  get: (query: AlbumQueryOut) => Promise<MusicData[]>;
}

const dbAlbums: dbAlbums = {
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
