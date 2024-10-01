"use server";

import { type OnboardingState } from "@/server/api/routers/onboarding";
import { api } from "@/trpc/server";

export const getOnboardingProgress =
  async (): Promise<OnboardingState | null> => {
    try {
      const progress = await api.onboarding.getProgress();
      return progress;
    } catch (error) {
      console.error("Failed to fetch onboarding progress:", error);
      return null;
    }
    return null;
  };
