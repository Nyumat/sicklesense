"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
  //   const [dataConsent, setDataConsent] = useState(false);
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
  }, [age, scdType, conditionStatus]);

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
      router.push("/dashboard");
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
                  <div className="w-full max-w-xs">
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
