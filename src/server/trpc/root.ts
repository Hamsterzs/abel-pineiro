import { musicRouter } from "./routers/song";
import { router } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = router({
  music: musicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
