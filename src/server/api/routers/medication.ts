import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { reminderTask } from "@/trigger/reminder";
import { schedules } from "@trigger.dev/sdk/v3";
import CronTime from "cron-time-generator";

export const medicationRouter = createTRPCRouter({
    addMedication: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        dosage: z.string(),
        frequency: z.string(),
        time: z.string().optional(),    
        reminderEnabled: z.boolean(),
        reminderDetails: z
          .object({
            reminderFrequency: z.string().optional(),
            reminderTime: z.date().optional(),
            reminderPhone: z.string().optional(),
          })
          .optional()
          .refine(
            (a) => {
              if (a?.reminderFrequency || a?.reminderTime || a?.reminderPhone) {
                return true;
              }
              return false;
            },
            {
              message: "Reminder details are required if reminder is enabled",
            },
          ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const { reminderDetails, ...medicationData } = input;
      const { reminderTime, reminderFrequency, reminderPhone } =
        input.reminderDetails ?? {};

      const newMedication = await ctx.db.medication.create({
        data: {
          ...medicationData,
          reminderTime: reminderTime ?? null,
          reminderFrequency: reminderFrequency ?? null,
          reminderPhone: reminderPhone ?? null,
          PatientProfile: {
            connect: {
              userId,
            },
          },
        },
      });

      const frequencyTimeToCron = (
        frequency: "daily" | "weekly" | "monthly",
        time: Date,
      ) => {
        const hour = time.getHours();
        const minute = time.getMinutes();

        switch (frequency) {
          case "daily":
            return CronTime.everyDayAt(hour, minute);
          case "weekly":
            return CronTime.everyWeekAt([time.getDay()], hour, minute);
          case "monthly":
            return CronTime.everyMonthOn([time.getDate()], hour, minute);
          default:
            throw new Error("Unsupported frequency");
        }
      };

      if (newMedication.reminderEnabled && reminderDetails) {
        const parsedFrequency = reminderDetails.reminderFrequency
          ?.toLowerCase()
          .includes("daily")
          ? "daily"
          : reminderDetails.reminderFrequency?.includes("weekly")
            ? "weekly"
            : reminderDetails.reminderFrequency?.includes("monthly")
              ? "monthly"
              : "daily";

        const cron = frequencyTimeToCron(
          parsedFrequency,
          newMedication.reminderTime as Date,
        );

        await schedules.create({
          task: reminderTask.id,
          externalId: userId,
          cron,
          deduplicationKey: `medication-reminder-${newMedication.id}-${userId}`,
        });
      }

      return newMedication;
    }),
    getMedications: protectedProcedure.
        query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      return [];
    }

    const medications = await ctx.db.medication.findMany({
      where: {
        PatientProfile: {
          userId,
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return medications;
  }),
  logMedication: protectedProcedure
    .input(
      z.object({
        medicationId: z.string(),
        date: z.date(),
        taken: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const log = await ctx.db.medicationLog.create({
        data: input,
      });

      return log;
    }),

  getMedicationLogs: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        return [];
      }

      const logs = await ctx.db.medicationLog.findMany({
        where: {
          medication: {
            PatientProfile: {
              userId,
            },
          },
          date: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        include: {
          medication: true,
        },
      });

      return logs;
    }),
  toggleMedicationReminder: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        reminder: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const medication = await ctx.db.medication.findUnique({
        where: {
          id: input.id,
          PatientProfile: {
            userId,
          },
        },
      });

      if (!medication) {
        throw new Error("Medication not found");
      }

      const updated = await ctx.db.medication.update({
        where: {
          id: input.id,
        },
        data: {
          reminderEnabled: input.reminder,
        },
      });

      return updated;
    }),
  reorderMedications: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          order: z.number(),
        }),
      ),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const result = await ctx.db.$transaction(
        input.map((item) =>
          ctx.db.medication.update({
            where: {
              id: item.id,
              PatientProfile: {
                userId,
              },
            },
            data: {
              order: item.order,
            },
          }),
        ),
      );

      return result;
    }),
  removeMedication: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const medication = await ctx.db.medication.findUnique({
        where: {
          id: input.id,
        },
        select: {
          PatientProfile: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (medication?.PatientProfile?.userId !== userId) {
        throw new Error("Unauthorized");
      }

      const deleted = await ctx.db.medication.delete({
        where: {
          id: input.id,
        },
      });

      return deleted;
    }),
});