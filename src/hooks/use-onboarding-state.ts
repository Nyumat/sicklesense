import { getOnboardingProgress } from "@/lib/api";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

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

function useOnboardingState(userId: string | null): {
  state: OnboardingState;
  updateState: (newState: Partial<OnboardingState>) => void;
  completeOnboarding: ({
    id,
    age,
    conditionStatus,
    scdType,
  }: CompleteOnboarding) => void;
} {
  const [state, setState] = useState<OnboardingState>({
    id: userId,
    age: 0,
    conditionStatus: "",
    scdType: "",
    step: 0,
  });

  if (!userId) {
    throw new Error("User ID is required to proceed with onboarding.");
  }

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
      const mutation = api.onboarding.saveProgress.useMutation();
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

  return { state, updateState, completeOnboarding };
}

export { useOnboardingState };
