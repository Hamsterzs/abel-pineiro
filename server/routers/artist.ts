import { z } from "zod";
import prisma from "../../lib/prisma";
import { procedure, router } from "../trpc";

export const artistRouter = router({
  all: procedure.query(() => prisma.artist.findMany()),
  delete: procedure
    .input(z.string().min(1))
    .mutation(({ input }) => prisma.artist.delete({ where: { id: input } })),
  albums: procedure
    .input(z.string().min(1))
    .query(({ input }) =>
      prisma.album.findMany({ where: { artistId: input } })
    ),
});

// export type definition of API
export type ArtistRouter = typeof artistRouter;
