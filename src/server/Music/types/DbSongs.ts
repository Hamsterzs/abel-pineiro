import { SongQueryOut } from "../schemas/songs/getSongs";
import { MusicData } from "./MusicData";

export type DbSongs = {
  get: (query: SongQueryOut) => Promise<MusicData[]>;
};
