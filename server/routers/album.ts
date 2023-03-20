import { z } from "zod";
import prisma from "../../lib/prisma";
import { procedure, router } from "../trpc";

export const albumRouter = router({
  all: procedure.query(() => prisma.album.findMany()),
  delete: procedure
    .input(z.string().min(1))
    .mutation(({ input }) => prisma.album.delete({ where: { id: input } })),
});

// export type definition of API
export type albumRouter = typeof albumRouter;
