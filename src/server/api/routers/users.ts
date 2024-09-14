import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email } = input;

      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("Email already in use");
      }

      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          emailVerified: new Date(),
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
