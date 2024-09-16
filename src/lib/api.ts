import { type OnboardingState } from "@/server/api/routers/onboarding";
import { api } from "@/trpc/react";

export const getOnboardingProgress =
  async (): Promise<OnboardingState | null> => {
    try {
      api.onboarding.getProgress.useQuery();
    } catch (error) {
      console.error("Failed to fetch onboarding progress:", error);
      return null;
    }
    return null;
  };

export const saveOnboardingProgress = async (
  state: OnboardingState,
): Promise<boolean> => {
  try {
    const mutation = api.onboarding.saveProgress.useMutation();
    await mutation.mutateAsync(state);
    return true;
  } catch (error) {
    console.error("Failed to save onboarding progress:", error);
    return false;
  }
};

type UserSignUpFields = {
  email: string;
  name: string;
  password: string;
};

export const signUpUser = async (data: UserSignUpFields): Promise<boolean> => {
  try {
    const mutation = api.auth.signUp.useMutation();
    await mutation.mutateAsync(data);
    return true;
  } catch (error) {
    console.error("Failed to sign up user:", error);
    return false;
  }
};
