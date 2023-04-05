import prisma from "../../lib/prisma";
import { MusicData } from "../types";
import { ArtistQueryOut } from "./schema";

interface dbArtists {
  get: (query: ArtistQueryOut) => Promise<MusicData[]>;
}

class Artists implements dbArtists {
  get = async (query: ArtistQueryOut) => {
    const artists = await prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        rating: true,
        image: true,
      },
      orderBy: {
        [query.sortBy]: query.order,
      },
    });

    return artists.map((artist) => ({
      id: artist.id,
      title: artist.name,
      rating: artist.rating,
      image: artist.image.url,
    }));
  };
}

const dbArtists = new Artists();

export default dbArtists;
