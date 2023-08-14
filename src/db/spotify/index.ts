import { z } from "zod";
import { db } from "../../drizzle/dbServerless";
import { spotify } from "../../drizzle/schema";
import { createId } from "@paralleldrive/cuid2";

const newTokensValidator = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().optional(),
});

type NewTokens = z.infer<typeof newTokensValidator>;

const dbActions = {
  getTokens: async () => (await db.select().from(spotify).limit(1))[0],
  setNewTokens: async (input: NewTokens) => {
    const validTokens = newTokensValidator.parse(input);

    if (validTokens.refreshToken) {
      await db.delete(spotify);

      const newToken = {
        accessToken: validTokens.accessToken,
        refreshToken: validTokens.refreshToken,
        id: createId(),
      };

      await db.insert(spotify).values(newToken);

      return newToken;
    }

    await db.update(spotify).set({ accessToken: validTokens.accessToken });

    return validTokens;
  },
};

const dbSpotify = Object.freeze(dbActions);

export default dbSpotify;
