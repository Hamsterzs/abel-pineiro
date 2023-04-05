import prisma from "../../lib/prisma";
import { MusicData } from "../types";
import { AlbumQueryOut } from "./schema";

interface dbAlbums {
  get: (query: AlbumQueryOut) => Promise<MusicData[]>;
}

class Albums implements dbAlbums {
  get = async (query: AlbumQueryOut) => {
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
  };
}

const dbAlbums = new Albums();

export default dbAlbums;
