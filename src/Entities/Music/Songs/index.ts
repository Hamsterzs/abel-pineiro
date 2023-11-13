import { eq } from "drizzle-orm";
import { db } from "../../../../db/db";
import { album, artist, image, song } from "../../../../db/schema";

class Songs {
  constructor() {}

  public async list() {
    const songs = await db
      .select({
        id: song.id,
        name: song.title,
        image: image.url,
        rating: song.rating,
        artistId: artist.id,
        artistName: artist.name,
      })
      .from(song)
      .leftJoin(artist, eq(song.artistId, artist.id))
      .leftJoin(album, eq(song.albumId, album.id))
      .leftJoin(image, eq(album.imageId, image.id));

    const data = {
      dateFetched: new Date().toLocaleDateString("en-US"),
      songs: songs.map((song) => ({
        id: song.id,
        image: song.image,
        rating: song.rating,
        name: song.name,
        artist: {
          id: song.artistId,
          name: song.artistName
        }
      })),
    };

    return data;
  }
}

export default Songs;