import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { album, artist, image, song } from "../../db/schema";
import { MusicData } from "./Music/types/MusicData";
import { cache } from "react";

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

  const musicData: MusicData[] = songs.map(
    (song) =>
      ({
        id: song.id,
        image: song.image,
        rating: song.rating,
        title: song.name,
        subTitle: song.artist,
      } as MusicData)
  );

  return {
    music: musicData,
    dateFetched: new Date().toISOString(),
  };
};

const cachedGetMusic = cache(getMusic);

export default cachedGetMusic;
