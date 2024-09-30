import { onboardingRouter } from "@/server/api/routers/onboarding";
import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/users";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { symptomsRouter } from "./routers/symptoms";
import { medicationRouter } from "./routers/medication";
import { appointmentsRouter } from "./routers/appointments";
import { healthplanRouter } from "./routers/healthplan";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
const appRouter = createTRPCRouter({
    post: postRouter,
    users: userRouter,
    symptom: symptomsRouter, 
    medication: medicationRouter,   
    onboarding: onboardingRouter,
    appointment: appointmentsRouter,
    healthplan: healthplanRouter,
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
const createCaller = createCallerFactory(appRouter);

export { appRouter, createCaller};