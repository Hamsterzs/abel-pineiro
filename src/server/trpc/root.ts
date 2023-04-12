import { drizzRouter } from "./routers/drizz";
import { primaRouter } from "./routers/prima";
import { musicRouter } from "./routers/song";
import { router } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = router({
  music: musicRouter,
  prima: primaRouter,
  drizz: drizzRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
