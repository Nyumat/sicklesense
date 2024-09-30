import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";
import { openai } from "@ai-sdk/openai";
import { generateObject } from 'ai';
import { z } from "zod";

const prompt = (topics: string[], patientProfile: unknown, startDate: string, endDate: string) =>
    `
You are a sickle cell compatriot and you are about to create a health plan for one of the users on the platform.
You are given the following topics to choose from:

${topics}

You are to provide the following details, based on the topics given:

Here's an example of the output format:
Title: Avoid High Altitudes
Description: For this next plan, we need you to focus on avoiding high altitudes. According to your data, you were above 2000m for 3 days last month, which is a high-risk factor for sickle cell crises. Going forward, we recommend you avoid altitudes above 1500m.
    
Don't use the above text as the final health plan. You are to generate a unique health plan based on the topics provided.

Here's the user's patient profile, which you can use to generate contextually relevant health plans:

${JSON.stringify(patientProfile)}

Today's date is ${new Date().toLocaleDateString()}.

The start date for the health plan is ${startDate} and the end date is ${endDate}.

Include language to make the generated health plan sound more personalized. 

Stuff like
- "Based on your data, we recommend..."
- "According to your health metrics, you should..."
- "Given your recent symptoms from [some day], it's important to..."
- "Since you're taking these medications x y z, we suggest..."
- "Considering your recent appointments with x y z, we advise..."

- The health plan should be specific to the user's data and the topics provided.
- The health plan should be actionable and easy to understand.
- Don't just repeat the topics provided, but use them to generate a unique health plan.
- Don't forward information to "See healthcare provider" or "Consult a doctor" as the user is already aware of this.
- The title shouldn't just be one of the topics provided, but a unique title based on the user's data and the topics provided.
`;


export const healthplanRouter = createTRPCRouter({
    createHealthPlan: protectedProcedure
        .input(
            z.object({
                startDate: z.string(),
                endDate: z.string(),
                topics: z.array(z.string()),
            }),
        )
        .mutation(async ({ input, ctx }) => {

            const userId = ctx.session?.user.id;

            if (!userId) {
                throw new Error("Unauthorized");
            }

            const patientProfileDetails = await ctx.db.patientProfile.findFirst({
                where: {
                    userId,
                },
                include: {
                    user: true,
                    appointments: true,
                    healthMetrics: true,
                    medications: true,
                    symptoms: true,
                    physicians: true,
                },
            });

            const { topics, startDate, endDate } = input;

            const { object } = await generateObject({
                model: openai("gpt-3.5-turbo"),
                schema: z.object({
                    plan: z.object({
                        title: z.string(),
                        description: z.string(),
                    }),
                }),
                prompt: prompt(topics, patientProfileDetails, startDate, endDate),
            });

            if (!object) {
                throw new Error("Failed to generate health plan");
            }

            if (!userId) {
                throw new Error("Unauthorized");
            }

            await ctx.db.healthPlan.updateMany({
                where: {
                    patientProfile: {
                        userId,
                    },
                    activityState: "Active",
                },
                data: {
                    activityState: "Inactive",
                },
            });

            const newHealthPlan = await ctx.db.healthPlan.create({
                data: {
                    startDate: new Date(startDate),
                    activityState: "Active",
                    endDate: new Date(endDate),
                    patientProfile: {
                        connect: {
                            userId,
                        },
                    },
                    title: object.plan.title,
                    description: object.plan.description,
                    createdAt: new Date(),
                },
            });

            return newHealthPlan;
        }),
    healthPlans: protectedProcedure.query(async ({ ctx }) => {
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
            const healthPlans = await ctx.db.healthPlan.findMany({
                where: {
                    patientProfileId: _.patientProfile.id,
                },
            });

            return healthPlans;
        } catch (error) {
            console.error(error);
            return [];
        }
    }),
    toggleActivityState: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                activityState: z.enum(["Active", "Inactive", "Paused", "Completed"]),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const userId = ctx.session?.user.id;
            if (!userId) {
                throw new Error("Unauthorized");
            }

            const healthPlan = await ctx.db.healthPlan.findFirst({
                where: {
                    id: input.id,
                    patientProfile: {
                        userId,
                    },
                },
            });

            if (!healthPlan) {
                throw new Error("Health plan not found");
            }

            const updatedHealthPlan = await ctx.db.healthPlan.update({
                where: {
                    id: input.id,
                },
                data: {
                    activityState: input.activityState,
                },
            });

            return updatedHealthPlan;
        }),
    current: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user.id;
        if (!userId) {
            return null;
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
            return null;
        }

        const healthPlan = await ctx.db.healthPlan.findFirst({
            where: {
                patientProfileId: _.patientProfile.id,
                activityState: "Active",
            },
        });

        return healthPlan ?? null;
    }),
    getByType: protectedProcedure
        .input(z.object({ type: z.enum(["Paused", "Active", "Inactive", "Completed"]) })).query(async ({ input, ctx }) => {

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
                const healthPlans = await ctx.db.healthPlan.findMany({
                    where: {
                        patientProfileId: _.patientProfile.id,
                        activityState: input.type,
                    },
                });

                return healthPlans;
            } catch (error) {
                console.error(error);
                return [];
            }
        }),
});