import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Gender, SickleCellType } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

export const userRouter = createTRPCRouter({
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

    if (
      ctx.session?.user.email?.toLowerCase().includes("nyuma") ||
      ctx.session?.user.email?.toLowerCase().includes("tom")
    ) {
      return false;
    }

    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      select: { onboardingState: true },
    });

    const state = user?.onboardingState as { step: number };

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
  gatherContext: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      return null;
    }

    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      select: {
        patientProfile: true,
      },
    });

    const patientProfileId = user?.patientProfile?.id;

    if (!patientProfileId) {
      return null;
    }

    const patientProfile = await ctx.db.patientProfile.findUnique({
      where: { id: patientProfileId },
      include: {
        medications: true,
        healthPlans: true,
        appointments: true,
        symptoms: true,
        healthMetrics: true,
        physicians: true,
      },
    });

    return patientProfile;
  }),
  deleteAccount: publicProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    try {
      await ctx.db.user.delete({
        where: { id: userId },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new Error("Failed to delete account");
    }

    return { success: true };
  }),
});
