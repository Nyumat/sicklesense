"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export type CompleteOnboarding = {
  id: string | null;
  age: number;
  conditionStatus: string;
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
      <SelectItem value="HbSS">HbSS</SelectItem>
      <SelectItem value="HbSC">HbSC</SelectItem>
      <SelectItem value="HbS beta thalassemia">HbS beta thalassemia</SelectItem>
      <SelectItem value="Other">Other</SelectItem>
    </SelectContent>
  </Select>
);

const ConditionStatusSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Select onValueChange={onChange} defaultValue={value}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select Condition Status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Diagnosed">Diagnosed</SelectItem>
      <SelectItem value="Carrier">Carrier</SelectItem>
      <SelectItem value="Undiagnosed">Undiagnosed</SelectItem>
    </SelectContent>
  </Select>
);

const AgeInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Input
    type="number"
    placeholder="Enter your age"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export function Onboarding({ userId }: { userId: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<OnboardingState>({
    id: userId,
    age: 0,
    conditionStatus: "",
    scdType: "",
    step: 0,
  });
  const [scdType, setScdType] = useState("");
  const [age, setAge] = useState("");
  const [conditionStatus, setConditionStatus] = useState("");
  const mutation = api.onboarding.saveProgress.useMutation();
  const steps = useMemo(() => {
    return [
      {
        title: "Age",
        description: "Enter your age",
        component: <AgeInput value={age} onChange={setAge} />,
      },
      {
        title: "SCD Type",
        description: "Select your SCD type",
        component: <SCDTypeSelect value={scdType} onChange={setScdType} />,
      },
      {
        title: "Condition Status",
        description: "Select your condition status",
        component: (
          <ConditionStatusSelect
            value={conditionStatus}
            onChange={setConditionStatus}
          />
        ),
      },
    ];
  }, [age, scdType, conditionStatus]);

  console.log({ state, currentStep, scdType, age, conditionStatus });

  const saveOnboardingProgress = async ({
    id,
    age,
    conditionStatus,
    scdType,
    step,
  }: CompleteOnboarding): Promise<boolean> => {
    try {
      if (!id) {
        throw new Error("User ID is required to save onboarding progress.");
      }
      await mutation.mutateAsync({ id, age, conditionStatus, scdType, step });
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
            age: currentProgress.age,
            conditionStatus: currentProgress.conditionStatus,
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
    age,
    conditionStatus,
    scdType,
  }: CompleteOnboarding) => {
    localStorage.removeItem("onboardingState");
    if (userId) {
      await saveOnboardingProgress({
        id: userId,
        age,
        conditionStatus,
        scdType,
        step: 3,
      });
    }
  };

  const nextStep = async () => {
    if (currentStep === steps.length - 1) {
      await completeOnboarding({
        id: userId,
        age: parseInt(age),
        scdType,
        conditionStatus,
      });
    } else {
      updateState({
        age: parseInt(age),
        scdType,
        conditionStatus,
        step: currentStep + 1,
      });
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-5">
        <div className="mb-8 flex justify-center space-x-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-4 w-4 rounded-full transition-colors duration-200",
                index <= currentStep
                  ? "bg-[hsl(280,100%,70%)]"
                  : "bg-[hsl(280,100%,90%)]",
              )}
            />
          ))}
        </div>
        <div className="relative h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-0 w-full"
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {steps[currentStep]!.title}
                </h1>
                <p className="max-w-lg text-center text-lg text-gray-600 dark:text-gray-400">
                  {steps[currentStep]!.description}
                </p>
                {steps[currentStep]!.component}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          <div className="text-2xl font-bold">{currentStep + 1}</div>
          <Button onClick={nextStep}>
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
