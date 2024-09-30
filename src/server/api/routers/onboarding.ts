import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Gender, SickleCellType } from "@prisma/client";
import { z } from "zod";

const onboardingStateSchema = z.object({
  id: z.string(),
  dateOfBirth: z.date(),
  gender: z.string(),
  scdType: z.string(),
  step: z.number().int().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
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

      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          patientProfile: {
            create: {
              dateOfBirth: input.dateOfBirth,
              gender: input.gender as Gender,
              sickleCellType: input.scdType as SickleCellType,
            },
          },
        },
      });

      return true;
    }),

  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        onboardingState: {
          step: 5,
          completed: true,
        },
      },
    });
    return true;
  }),
});
