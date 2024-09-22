import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { Onboarding } from "./_sub";

export default async function OnboardingPage() {
  const session = await getServerAuthSession();
  const userId = session?.user?.id ?? "";
  const isOnboarded = await api.users.isOnboarded();
  if (isOnboarded) {
    redirect("/dashboard");
  }
  return (
    <>
      <Onboarding userId={userId} />
    </>
  );
}
