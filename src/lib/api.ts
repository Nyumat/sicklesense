import { api } from "@/trpc/react";

export const getOnboardingProgress = async (
  userId: string,
): Promise<OnboardingState | null> => {
  try {
    return await api.onboarding.getProgress.query();
  } catch (error) {
    console.error("Failed to fetch onboarding progress:", error);
    return null;
  }
};

export const saveOnboardingProgress = async (
  userId: string,
  state: OnboardingState,
): Promise<boolean> => {
  try {
    return await api.onboarding.saveProgress.mutate(state);
  } catch (error) {
    console.error("Failed to save onboarding progress:", error);
    return false;
  }
};
