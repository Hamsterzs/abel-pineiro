import { ArtistQueryOut } from "../schemas/artists/getArtists";
import { MusicData } from "./MusicData";

export type DbArtists = {
  get: (query: ArtistQueryOut) => Promise<MusicData[]>;
};
