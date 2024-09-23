import { assignmentJsonRouter } from "@/server/api/routers/assignment-json"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"
import { batchRouter } from "./routers/batch"
import { assignmentRouter } from "./routers/assignment"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	assignmentJson: assignmentJsonRouter,
	batch: batchRouter,
	assignment: assignmentRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
