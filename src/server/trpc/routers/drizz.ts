import { allTransactions, seedTransactions } from "../../../drizzle/db";
import { procedure, router } from "../trpc";

export const drizzRouter = router({
  seed: procedure.mutation(async () => {
    return await seedTransactions();
  }),
  get: procedure.query(() => allTransactions()),
});
