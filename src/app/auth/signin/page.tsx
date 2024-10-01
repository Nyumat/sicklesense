import { SignInBtn } from "@/app/_components/signin-button";
import { getProviders } from "next-auth/react";
import { Suspense } from "react";

export default async function SignIn() {
    const providers = await getProviders();
    return (
        <div className="py-36">
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Welcome to SickleSense
                    </p>
                </div>
                <div className="grid gap-4">
                    <Suspense fallback="Loading...">
                        <SignInBtn providers={providers} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
