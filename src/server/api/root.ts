import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { appointmentsRouter } from "@/server/api/routers/appointments";
import { medicationRouter } from "@/server/api/routers/medication";
import { onboardingRouter } from "@/server/api/routers/onboarding";
import { postRouter } from "@/server/api/routers/post";
import { symptomsRouter } from "@/server/api/routers/symptoms";
import { userRouter } from "@/server/api/routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    post: postRouter,
    users: userRouter,
    symptom: symptomsRouter, 
    medication: medicationRouter,   
    onboarding: onboardingRouter,
    appointment: appointmentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
