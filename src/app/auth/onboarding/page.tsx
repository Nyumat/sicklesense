import { getServerAuthSession } from "@/server/auth";
import { Onboarding } from "./_sub";
import React from "react";
import { api } from "@/trpc/server";
import { permanentRedirect } from "next/navigation";


export default async function OnboardingPage() {
    const session = await getServerAuthSession();
    const userId = session?.user?.id ?? "";
    const isOnboarded = await api.users.isOnboarded();
    if (isOnboarded) {
        permanentRedirect("/dashboard");
    }
    return (
        <>
            <Onboarding userId={userId} />
        </>
    );
}
