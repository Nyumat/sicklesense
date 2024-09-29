import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";

export const symptomsRouter = createTRPCRouter({
    addSymptom: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        severity: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      const n_symptom = await ctx.db.symptom.create({
        data: {
          name: input.name,
          severity: input.severity,
          patientProfile: {
            connect: {
              userId,
            },
          },
          createdAt: new Date(),
        },
      });

      return n_symptom;
    }),
    symptoms: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user.id;
        return await ctx.db.symptom.findMany({
            where: {
                patientProfile: {
                    userId,
                },
            }
        });
    }),
});