import { getOnboardingProgress, saveOnboardingProgress } from "@/lib/api";
import { useEffect, useState } from "react";

export type OnboardingState = {
  step: number;
  email?: string;
  preferences?: string[];
  comple;
};

function useOnboardingState(userId: string | null): {
  state: OnboardingState;
  updateState: (newState: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
} {
  const [state, setState] = useState<OnboardingState>({ step: 0 });

  if (!userId) {
    throw new Error("User ID is required to proceed with onboarding.");
  }

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
          setState(currentProgress);
        }
      });
    }
  }, [userId]);
  // Save state to localStorage and database when it changes
  useEffect(() => {
    localStorage.setItem("onboardingState", JSON.stringify(state));
    if (userId) {
      void saveOnboardingProgress(userId, state);
    }
  }, [state, userId]);

  // Function to update state
  const updateState = (newState: Partial<OnboardingState>) => {
    setState((prev: OnboardingState) => ({ ...prev, ...newState }));
  };

  // Function to complete onboarding
  const completeOnboarding = () => {
    localStorage.removeItem("onboardingState");
    if (userId) {
      void saveOnboardingProgress(userId, { ...state, completed: true });
    }
  };

  return { state, updateState, completeOnboarding };
}

export { useOnboardingState };
