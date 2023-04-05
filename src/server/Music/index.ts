import dbAlbums from "../../db/albums";
import { AlbumQueryOut } from "../../db/albums/schema";
import dbArtists from "../../db/artists";
import { ArtistQueryOut } from "../../db/artists/schema";
import dbSongs from "../../db/songs";
import { SongQueryOut } from "../../db/songs/schema";
import { MusicData } from "../../db/types";
import { GetValidator, GetValidatorIn, getValidator } from "./schema";

export const getMusic = (musicQuery: GetValidatorIn): Promise<MusicData[]> => {
  const validatedMusicQuery = getValidator.parse(musicQuery);

  const { type, query } = validatedMusicQuery;

  if (type === "albums") return dbAlbums.get(query);
  if (type === "artists") return dbArtists.get(query);

  return dbSongs.get(query);
};
