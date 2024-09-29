import { CompleteOnboarding } from "@/app/auth/onboarding/_sub";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { reminderTask } from "@/trigger/reminder";
import { Gender, SickleCellType } from "@prisma/client";
import { schedules } from "@trigger.dev/sdk/v3";
import bcrypt from "bcrypt";
import { CronTime } from "cron-time-generator";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  toggleMedicationReminder: publicProcedure
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
  reorderMedications: publicProcedure
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
  removeMedication: publicProcedure
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
  addAppointment: publicProcedure
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
  appointments: publicProcedure.query(async ({ ctx }) => {
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
  me: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        image: true,
      },
    });

    return user;
  }),
  addSymptom: publicProcedure
    .input(
      z.object({
        name: z.string(),
        severity: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

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
  symptoms: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
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
      if (_) {
          try {
              const symptoms = await ctx.db.symptom.findMany({
                  where: {
                      patientProfileId: _.patientProfile?.id,
                  },
                  orderBy: {
                      date: "desc",
                  },
              });
              return symptoms;
          } catch (error) {
              console.error(error);
              return [];
          }
      } else {
          return [];
      }
  }),
  updatePersonalInfo: publicProcedure
    .input(
      z.object({
        dateOfBirth: z.string(),
        sickleCellType: z.string(),
        gender: z.string(),
        diagnosisDate: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const type = input.sickleCellType as SickleCellType;
      const gender = input.gender as Gender;
      if (!Object.values(SickleCellType).includes(type)) {
        throw new Error("Invalid sickle cell type");
      }

      const user = await ctx.db.user.update({
        where: { id: userId },
        data: {
          patientProfile: {
            update: {
              dateOfBirth: new Date(input.dateOfBirth),
              sickleCellType: type,
              gender: gender,
              diagnosisDate: new Date(input.diagnosisDate),
            },
          },
        },
        select: {
          patientProfile: {
            select: {
              dateOfBirth: true,
              sickleCellType: true,
              gender: true,
              diagnosisDate: true,
            },
          },
        },
      });

      return user?.patientProfile;
    }),
  personalInfo: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      return null;
    }
    const userPersonalInformation = await ctx.db.user.findUnique({
      where: { id: userId },
      select: {
        patientProfile: {
          select: {
            dateOfBirth: true,
            sickleCellType: true,
            gender: true,
            diagnosisDate: true,
          },
        },
      },
    });

    return userPersonalInformation?.patientProfile;
  }),
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
  addMedication: publicProcedure
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
      let reminder;
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

        reminder = await schedules.create({
          task: reminderTask.id,
          externalId: userId,
          cron,
          deduplicationKey: `medication-reminder-${newMedication.id}-${userId}`,
        });
      }

      return newMedication;
    }),
  getMedications: publicProcedure.query(async ({ ctx }) => {
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

  logMedication: publicProcedure
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
});
