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

// type UserSignUpFields = {
//   email: string;
//   name: string;
//   password: string;
// };

// export const signUpUser = async (data: UserSignUpFields): Promise<boolean> => {
//   try {
//     const mutation = api.auth.signUp.useMutation();
//     await mutation.mutateAsync(data);
//     return true;
//   } catch (error) {
//     console.error("Failed to sign up user:", error);
//     return false;
//   }
// };
