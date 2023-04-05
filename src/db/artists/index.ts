import prisma from "../../lib/prisma";
import { MusicData } from "../../server/Music/types/MusicData";
import { ArtistQueryOut } from "../../server/Music/schemas/artists/getArtists";
import { DbArtists } from "../../server/Music/types/DbArtists";

const dbArtists: DbArtists = {
  get: async (query) => {
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
  },
};

export default Object.freeze(dbArtists);
