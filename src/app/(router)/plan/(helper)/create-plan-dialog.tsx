"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { CircleLoader } from "react-spinners";
import * as z from "zod";

const healthPlanSchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date",
    }),
    topics: z.array(z.string()).min(1, "Select at least one topic"),
});

type HealthPlanFormData = z.infer<typeof healthPlanSchema>;

const topics = [
    "Pain Management", "Medication Adherence", "Hydration", "Exercise",
    "Nutrition", "Stress Management", "Sleep Health", "Infection Prevention",
    "Clinic Visits", "Emergency Preparedness", "Mental Health", "Social Support"
];

const LoadingView = () => (
    <div className="flex flex-col items-center justify-center h-[300px]">
        <CircleLoader color="#9933ff" size={50} className="mb-8 scale-125" />
        <p className="mt-4 text-center">Creating your personalized health plan...</p>
    </div>
);

export default function CreatePlanDialog() {
    const utils = api.useUtils();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(0);

    const createPlan = api.healthplan.createHealthPlan.useMutation({
        onSuccess: () => {
            utils.healthplan.healthPlans.invalidate();
            utils.healthplan.current.invalidate();
        },
    });

    const form = useForm<HealthPlanFormData>({
        resolver: zodResolver(healthPlanSchema),
        defaultValues: {
            startDate: "",
            endDate: "",
            topics: [],
        },
    });

    const onSubmit = async (data: HealthPlanFormData) => {
        setIsLoading(true);
        try {
            await createPlan.mutateAsync(data);
        } catch (error) {
            console.error('Error creating plan:', error);
        } finally {
            setOpen(false);
            setIsLoading(false);
            setStep(0);
            form.reset();
        }
    };

    const nextStep = () => {
        if (step < 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const cardVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="p-8 w-1/2">Create New Plan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="p-6 space-y-4">
                            <DialogHeader>
                                <DialogTitle>Let&apos;s create a plan for you</DialogTitle>
                                <DialogDescription>
                                    {step === 0 ? "Set plan dates" : "Select health topics"}
                                </DialogDescription>
                            </DialogHeader>
                            {isLoading ? (
                                <LoadingView />
                            ) : (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        {step === 0 && (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="startDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Start Date</FormLabel>
                                                            <FormControl>
                                                                <Input type="date" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="endDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>End Date</FormLabel>
                                                            <FormControl>
                                                                <Input type="date" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="button" onClick={nextStep} className="w-full">
                                                    Next
                                                </Button>
                                            </>
                                        )}
                                        {step === 1 && (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="topics"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Topics</FormLabel>
                                                            <FormControl>
                                                                <div className="grid grid-cols-2 gap-2 mt-2">
                                                                    {topics.map((topic) => (
                                                                        <Badge
                                                                            key={topic}
                                                                            variant={field.value.includes(topic) ? "default" : "outline"}
                                                                            className={cn("cursor-pointer hover:bg-primary/30")}
                                                                            onClick={() => {
                                                                                const updatedTopics = field.value.includes(topic)
                                                                                    ? field.value.filter(t => t !== topic)
                                                                                    : [...field.value, topic];
                                                                                field.onChange(updatedTopics);
                                                                            }}
                                                                        >
                                                                            {topic}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex justify-between">
                                                    <Button type="button" onClick={prevStep}>
                                                        Previous
                                                    </Button>
                                                    <Button type="submit">
                                                        Create Plan
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                </Form>
                            )}
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}