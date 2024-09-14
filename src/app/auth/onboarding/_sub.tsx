"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    title: "Welcome to Our App",
    description: "We're glad to have you here. Let's get started with our app!",
    content: (
      <form className="w-full max-w-md">
        <Input type="email" placeholder="Enter your email" className="mb-4" />
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    ),
  },
  {
    title: "Customize Your Experience",
    description:
      "In this step, you can customize your app experience to better suit your needs.",
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="option1" className="form-checkbox" />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="option2" className="form-checkbox" />
          <label htmlFor="option2">Option 2</label>
        </div>
      </div>
    ),
  },
  {
    title: "You're All Set!",
    description:
      "You've successfully completed the onboarding process. Let's dive into the app now!",
    content: (
      <Button variant="outline" className="w-full">
        Get Started
      </Button>
    ),
  },
];

export function Onboarding({ userId }: { userId: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { state, updateState, completeOnboarding } = useOnboardingState(userId);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
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
                {steps[currentStep]!.content}
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
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
