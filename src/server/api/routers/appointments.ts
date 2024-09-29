import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const appointmentsRouter = createTRPCRouter({
    addAppointment: protectedProcedure
        .input(
            z.object({
                type: z.string(),
                date: z.string(),
                notes: z.string(),
                doctor: z.string(),
                title: z.string().optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session?.user.id;
            if (!userId) {
                throw new Error("Unauthorized");
            }

            const newAppointment = await ctx.db.appointment.create({
                data: {
                    title: input.title ?? "",
                    type: input.type,
                    date: new Date(input.date),
                    notes: input.notes,
                    doctor: input.doctor,
                    patientProfile: {
                        connect: {
                            userId,
                        },
                    },
                    createdAt: new Date(),
                },
            });

            return newAppointment;
        }),
    appointments: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user.id;
        if (!userId) {
            return [];
        }
        const _ = await ctx.db.user.findUnique({
            where: { id: userId },
            select: {
                patientProfile: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!_?.patientProfile?.id) {
            return [];
        }

        try {
            const appointments = await ctx.db.appointment.findMany({
                where: {
                    patientProfileId: _.patientProfile.id,
                },
                orderBy: {
                    date: "desc",
                },
            });
            return appointments;
        } catch (error) {
            console.error(error);
            return [];
        }
    }),
});