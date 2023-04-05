import { AlbumQueryOut } from "../schemas/albums/getAlbums";
import { MusicData } from "./MusicData";

export type DbAlbums = {
  get: (query: AlbumQueryOut) => Promise<MusicData[]>;
};
