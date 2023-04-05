import dbAlbums from "../db/albums";
import { AlbumQueryOut } from "../db/albums/validator";
import dbSongs, { MusicData } from "../db/songs";
import { DEFAULT_SONG_QUERY, SongQueryOut } from "../db/songs/validator";
import { GetValidatorIn, getValidator } from "../schemas/queries";

const getSongs = async (songQuery: SongQueryOut): Promise<MusicData[]> => {
  return dbSongs.get(songQuery);
};

const getAlbums = async (albumQuery: AlbumQueryOut): Promise<MusicData[]> => {
  return dbAlbums.get(albumQuery);
};

export const getMusic = (musicQuery: GetValidatorIn): Promise<MusicData[]> => {
  const validatedMusicQuery = getValidator.safeParse(musicQuery);

  if (!validatedMusicQuery.success) return getSongs(DEFAULT_SONG_QUERY);

  const { type, query } = validatedMusicQuery.data;

  if (type === "albums") return getAlbums(query);

  return getSongs(query);
};
