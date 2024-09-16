"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

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


export function Onboarding({
  userId,
  steps,
}: {
  userId: string;
  steps: Array<{
    title: string;
    description: string;
    component: React.ReactNode;
  }>;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const { state, updateState, completeOnboarding } = useOnboardingState(userId);
  const [scdType, setScdType] = useState("");
  const [age, setAge] = useState("");
  const [conditionStatus, setConditionStatus] = useState("");

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      completeOnboarding();
    } else {
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
                {currentStep === 1 && (
                  <div className="w-full space-y-4">
                    <Label>SCD Type</Label>
                    <SCDTypeSelect value={scdType} onChange={setScdType} />
                    <Label>Age</Label>
                    <AgeInput value={age} onChange={setAge} />
                    <Label>Condition Status</Label>
                    <ConditionStatusSelect
                      value={conditionStatus}
                      onChange={setConditionStatus}
                    />
                  </div>
                )}
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
          <Button
            onClick={nextStep}
            disabled={
              currentStep === 1 && (!scdType || !age || !conditionStatus)
            }
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
