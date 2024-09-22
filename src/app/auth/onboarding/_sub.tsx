"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getOnboardingProgress } from "@/lib/api";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Gender = "Male" | "Female" | "Other" | null | string;
export type CompleteOnboarding = {
    id: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    scdType: string;
    step?: number;
};

export type OnboardingState = CompleteOnboarding & {
    step?: number;
};

const SCDTypeSelect = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => (
    <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select SCD Type" />
        </SelectTrigger>
        <SelectContent>
            {['AA', 'AS', 'SS', 'AC', 'SC'].map((type) => (
                <SelectItem key={type} value={type}>
                    {type}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const GendeSelect = ({
    value,
    onChange,
}: {
    value: string | null;
    onChange: (value: string) => void;
}) => (
    <Select onValueChange={onChange} defaultValue={value?.toString()}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Condition Status" />
        </SelectTrigger>
        <SelectContent>
            {["Male", "Female", "Other"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                    {gender}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const AgeInput = ({
    value,
    onChange,
}: {
    value: Date | null;
    onChange: (value: Date) => void;
}) => (
    <div className="w-full flex items-center">
        <Popover>
            <PopoverTrigger asChild>

                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value ? (
                        format(value, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>

            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={2025}
                    mode="single"
                    selected={value ? new Date(value) : undefined}
                    onSelect={(date) => {
                        if (date) onChange(date);
                    }}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    </div>
);

export function Onboarding({ userId }: { userId: string }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [state, setState] = useState<OnboardingState>({
        id: userId,
        dateOfBirth: null,
        gender: null,
        scdType: "",
        step: 0,
    });
    const [scdType, setScdType] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [gender, setGender] = useState<Gender | string | null>("");
    //   const [dataConsent, setDataConsent] = useState(false);
    const mutation = api.onboarding.saveProgress.useMutation();
    const steps = useMemo(() => {
        return [
            {
                title: "Date of Birth",
                description: "Enter your date of birth",
                component: <AgeInput value={dateOfBirth} onChange={setDateOfBirth} />,
            },
            {
                title: "SCD Type",
                description: "Select your SCD type",
                component: <SCDTypeSelect value={scdType} onChange={setScdType} />,
            },
            {
                title: "Gener",
                description: "Select your gender",
                component: (
                    <GendeSelect value={gender} onChange={setGender} />
                ),
            },
            {
                title: "Data Consent",
                description: "Do you consent to share your data?",
                component: (
                    <>
                        <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-4">
                            <div className="flex scale-125 items-center space-x-2">
                                <Checkbox id="data-consent" />
                                <Label
                                    htmlFor="data-consent"
                                    className="cursor-pointer text-sm font-medium"
                                >
                                    Accept
                                </Label>
                            </div>
                            <p className="text-center text-sm text-muted-foreground">
                                By checking this box, you consent SickleSense to use your data
                                to improve the experience on the platform.
                            </p>
                        </div>
                    </>
                ),
            },
        ];
    }, [scdType, gender, dateOfBirth]);

    const saveOnboardingProgress = async ({
        id,
        dateOfBirth,
        gender,
        scdType,
        step,
    }: CompleteOnboarding): Promise<boolean> => {
        try {
            if (!id || !dateOfBirth || !gender || !scdType) {
                throw new Error("All fields are required to save onboarding progress.");
            }
            await mutation.mutateAsync({ id, dateOfBirth, gender, scdType, step });
            return true;
        } catch (error) {
            console.error("Failed to save onboarding progress:", error);
            return false;
        }
    };

    // Load state from localStorage on component mount
    useEffect(() => {
        const savedState = localStorage.getItem("onboardingState");
        if (savedState) {
            const retreivedState = JSON.parse(savedState) as OnboardingState;
            setState(retreivedState);
        } else if (userId) {
            void getOnboardingProgress().then((progress) => {
                if (progress) {
                    const currentProgress = progress;
                    setState({
                        id: userId,
                        dateOfBirth: currentProgress.dateOfBirth,
                        gender: currentProgress.gender,
                        scdType: currentProgress.scdType,
                        step: currentProgress.step,
                    });
                }
            });
        }
    }, [userId]);
    // Save state to localStorage and database when it changes
    useEffect(() => {
        localStorage.setItem("onboardingState", JSON.stringify(state));
    }, [state, userId]);

    // Function to update state
    const updateState = (newState: Partial<OnboardingState>) => {
        setState((prev: OnboardingState) => ({ ...prev, ...newState }));
    };

    // Function to complete onboarding
    const completeOnboarding = async ({
        dateOfBirth,
        gender,
        scdType,
    }: CompleteOnboarding) => {
        localStorage.removeItem("onboardingState");
        if (userId) {
            await saveOnboardingProgress({
                id: userId,
                dateOfBirth,
                gender,
                scdType,
                step: 3,
            });
        }
    };

    const nextStep = async () => {
        if (currentStep === steps.length - 1) {
            await completeOnboarding({
                id: userId,
                dateOfBirth,
                scdType,
                gender,
            });
            router.push("/auth/onboarded");
        } else {
            updateState({
                dateOfBirth,
                scdType,
                gender,
                step: currentStep + 1,
            });
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex justify-center space-x-2">
                                    {steps.map((_, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "h-2 w-2 rounded-full transition-colors duration-200",
                                                index <= currentStep ? "bg-primary" : "bg-primary/30",
                                            )}
                                        />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center space-y-6">
                                    <h1 className="text-center text-2xl font-bold sm:text-3xl">
                                        {steps[currentStep]!.title}
                                    </h1>
                                    <p className="max-w-lg text-center text-sm text-muted-foreground sm:text-base">
                                        {steps[currentStep]!.description}
                                    </p>
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        {steps[currentStep]!.component}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    variant="outline"
                                >
                                    Previous
                                </Button>
                                <div className="text-xl font-bold sm:text-2xl">
                                    {currentStep + 1}
                                </div>
                                <Button onClick={nextStep}>
                                    {currentStep === steps.length - 1 ? "Complete" : "Next"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
