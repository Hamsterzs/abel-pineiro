import { procedure, router } from "../trpc";
import prisma from "../../../lib/prisma";
import TRANSACTIONS from "../../../db/transactions/seed";

export const primaRouter = router({
  create: procedure.mutation(async () => {
    console.log("here");
    const create = await prisma.transactions.createMany({
      data: TRANSACTIONS,
    });

    console.log("created", create);
  }),
  get: procedure.query(() => prisma.transactions.findMany()),
});
