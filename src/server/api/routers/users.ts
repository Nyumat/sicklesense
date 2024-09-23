import { CompleteOnboarding } from "@/app/auth/onboarding/_sub";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Gender, SickleCellType } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    me: publicProcedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user.id;
        if (!userId) {
            return null;
        }

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
                },
            });

            return n_symptom;
        }),
    symptoms: publicProcedure.query(async ({ ctx }) => {
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
});
