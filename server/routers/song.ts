import { z } from "zod";
import prisma from "../../lib/prisma";
import { procedure, router } from "../trpc";

export const songRouter = router({
  all: procedure.query(() =>
    prisma.song.findMany({
      include: {
        artist: {
          select: {
            name: true,
          },
        },
        album: {
          include: {
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    })
  ),
});

// export type definition of API
export type SongRouter = typeof songRouter;
