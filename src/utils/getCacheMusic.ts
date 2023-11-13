import { eq } from "drizzle-orm";
import { album, artist, image, song } from "../drizzle/schema";
import db from "../drizzle/dbServerless";

// export const fetchCache = "force-no-store";
// export const revalidate = 0;

const getMusic = async () => {
  const songs = await db
    .select({
      id: song.id,
      name: song.title,
      artist: artist.name,
      image: image.url,
      rating: song.rating,
    })
    .from(song)
    .leftJoin(artist, eq(song.artistId, artist.id))
    .leftJoin(album, eq(song.albumId, album.id))
    .leftJoin(image, eq(album.imageId, image.id));

  const musicData: { dateFetched: string; music: any } = {
    dateFetched: new Date().toISOString(),
    music: songs.map((song) => ({
      id: song.id,
      image: song.image,
      rating: song.rating,
      title: song.name,
      subTitle: song.artist,
    })),
  };

  return musicData;
};

export default getMusic;
