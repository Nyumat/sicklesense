import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const onboardingStateSchema = z.object({
  id: z.string(),
  age: z.number().int(),
  conditionStatus: z.string(),
  scdType: z.string(),
  step: z.number().int().optional(),
});

export type OnboardingState = z.infer<typeof onboardingStateSchema>;

export const onboardingRouter = createTRPCRouter({
  getProgress: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { onboardingState: true },
    });
    return user?.onboardingState
      ? onboardingStateSchema.parse(user.onboardingState)
      : null;
  }),

  saveProgress: protectedProcedure
    .input(onboardingStateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { onboardingState: input },
      });
      return true;
    }),

  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        onboardingState: {
          step: 999, // You can use any number to indicate completion
          completed: true,
        },
      },
    });
    return true;
  }),
});
