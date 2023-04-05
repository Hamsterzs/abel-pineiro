import dbAlbums from "../../db/albums";
import { AlbumQueryOut } from "../../db/albums/schema";
import dbArtists from "../../db/artists";
import dbSongs from "../../db/songs";
import { SongQueryOut } from "../../db/songs/schema";
import { MusicData } from "../../db/types";
import { GetValidatorIn, getValidator } from "./schema";

const getSongs = async (songQuery: SongQueryOut): Promise<MusicData[]> => {
  return dbSongs.get(songQuery);
};

const getAlbums = async (albumQuery: AlbumQueryOut): Promise<MusicData[]> => {
  return dbAlbums.get(albumQuery);
};

const getArtists = async (albumQuery: AlbumQueryOut): Promise<MusicData[]> => {
  return dbArtists.get(albumQuery);
};

export const getMusic = (musicQuery: GetValidatorIn): Promise<MusicData[]> => {
  const validatedMusicQuery = getValidator.parse(musicQuery);

  const { type, query } = validatedMusicQuery;

  if (type === "albums") return getAlbums(query);

  if (type === "artists") return getArtists(query);

  return getSongs(query);
};
