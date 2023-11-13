import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  index,
  primaryKey,
  varchar,
  datetime,
  int,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

export const album = mysqlTable(
  "Album",
  {
    id: varchar("id", { length: 191 }).notNull(),
    title: varchar("title", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    artistId: varchar("artistId", { length: 191 }).notNull(),
    imageId: varchar("imageId", { length: 191 }).notNull(),
    rating: int("rating").notNull(),
    released: datetime("released", { mode: "string", fsp: 3 }).notNull(),
    description: varchar("description", { length: 191 }).notNull(),
  },
  (table) => {
    return {
      artistIdIdx: index("Album_artistId_idx").on(table.artistId),
      imageIdIdx: index("Album_imageId_idx").on(table.imageId),
      albumId: primaryKey(table.id),
    };
  }
);

export const albumRelations = relations(album, ({ many, one }) => ({
  artist: one(artist, {
    fields: [album.artistId],
    references: [artist.id],
  }),
  image: one(image, {
    fields: [album.imageId],
    references: [image.id],
  }),
  songs: many(song),
}));

export const artist = mysqlTable(
  "Artist",
  {
    id: varchar("id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    imageId: varchar("imageId", { length: 191 }).notNull(),
    rating: int("rating").notNull(),
  },
  (table) => {
    return {
      imageIdIdx: index("Artist_imageId_idx").on(table.imageId),
      artistId: primaryKey(table.id),
    };
  }
);

export const artistRelations = relations(artist, ({ many, one }) => ({
  image: one(image, {
    fields: [artist.imageId],
    references: [image.id],
  }),
  albums: many(album),
  songs: many(song),
}));

export const image = mysqlTable(
  "Image",
  {
    id: varchar("id", { length: 191 }).notNull(),
    url: varchar("url", { length: 191 }).notNull(),
  },
  (table) => {
    return {
      imageId: primaryKey(table.id),
    };
  }
);

export const song = mysqlTable(
  "Song",
  {
    id: varchar("id", { length: 191 }).notNull(),
    title: varchar("title", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    albumId: varchar("albumId", { length: 191 }).notNull(),
    artistId: varchar("artistId", { length: 191 }).notNull(),
    rating: int("rating").notNull(),
    released: datetime("released", { mode: "string", fsp: 3 }).notNull(),
    description: varchar("description", { length: 191 }).notNull(),
  },
  (table) => {
    return {
      albumIdIdx: index("Song_albumId_idx").on(table.albumId),
      artistIdIdx: index("Song_artistId_idx").on(table.artistId),
      songId: primaryKey(table.id),
    };
  }
);

export const songRelations = relations(song, ({ one }) => ({
  album: one(album, {
    fields: [song.albumId],
    references: [album.id],
  }),
  artist: one(artist, {
    fields: [song.artistId],
    references: [artist.id],
  }),
}));

export const spotify = mysqlTable(
  "Spotify",
  {
    id: varchar("id", { length: 191 }).notNull(),
    accessToken: varchar("accessToken", { length: 191 }).notNull(),
    refreshToken: varchar("refreshToken", { length: 191 }).notNull(),
  },
  (table) => {
    return {
      spotifyId: primaryKey(table.id),
    };
  }
);
