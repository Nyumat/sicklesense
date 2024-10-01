import { getServerAuthSession } from "@/server/auth";
import { Onboarding } from "./_sub";
import React from "react";

export default async function OnboardingPage() {
    const session = await getServerAuthSession();
    const userId = session?.user?.id ?? "";
    return (
        <>
            <Onboarding userId={userId} />
        </>
    );
}
