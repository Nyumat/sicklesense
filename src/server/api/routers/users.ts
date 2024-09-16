import { CompleteOnboarding } from "@/app/auth/onboarding/_sub";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import bcrypt from "bcrypt";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  isOnboarded: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      return false;
    }
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      select: { onboardingState: true },
    });

    const state = user?.onboardingState as CompleteOnboarding | null;

    return !!state?.step && state.step >= 3;
  }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(3),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      await ctx.db.account.create({
        data: {
          userId: user.id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: user.id,
        },
      });

      return { success: true, userId: user.id };
    }),
});
