import { albumRouter } from "./routers/album";
import { artistRouter } from "./routers/artist";
import { songRouter } from "./routers/song";
import { router } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = router({
  songs: songRouter,
  artists: artistRouter,
  albums: albumRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
