import dbAlbums from "../../db/albums";
import dbArtists from "../../db/artists";
import dbSongs from "../../db/songs";
import { MusicData } from "./types/MusicData";
import { GetValidatorIn, getValidator } from "./schemas/music/getMusic";

export const getMusic = (musicQuery: GetValidatorIn): Promise<MusicData[]> => {
  const validatedMusicQuery = getValidator.parse(musicQuery);

  const { type, query } = validatedMusicQuery;

  if (type === "albums") return dbAlbums.get(query);
  if (type === "artists") return dbArtists.get(query);

  return dbSongs.get(query);
};

export const getCacheMusic = async () => ({
  music: await dbSongs.get({ order: "desc", sortBy: "createdAt" }),
  dateFetched: new Date().toISOString(),
});
