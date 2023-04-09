import { z } from "zod";
import prisma from "../../lib/prisma";
import type { Spotify } from "@prisma/client";

const newTokensValidator = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().optional(),
});

type NewTokens = z.infer<typeof newTokensValidator>;

const dbActions = {
  getTokens: () => prisma.spotify.findFirst(),
  setNewTokens: async (input: NewTokens) => {
    const validTokens = newTokensValidator.parse(input);

    if (validTokens.refreshToken) {
      await prisma.spotify.deleteMany();
      return await prisma.spotify.create({
        data: {
          accessToken: validTokens.accessToken,
          refreshToken: validTokens.refreshToken,
        },
      });
    }

    return prisma.spotify.updateMany({
      data: { accessToken: validTokens.accessToken },
    });
  },
};

const dbSpotify = Object.freeze(dbActions);

export default dbSpotify;
