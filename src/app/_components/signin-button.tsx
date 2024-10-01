"use client";

import { Button } from "@/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { GithubIcon } from "lucide-react";
import { type BuiltInProviderType } from "next-auth/providers/index";
import {
    signIn,
    type ClientSafeProvider,
    type LiteralUnion,
} from "next-auth/react";
import { match } from "ts-pattern";
import React from "react";
import { FcGoogle } from "react-icons/fc";

interface SignInProps {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null;
}

export function SignInBtn({ providers }: SignInProps) {
    if (!providers) {
        return null;
    }

    const buildProviderButton = (provider: ClientSafeProvider) => {
        const buttonContent = match(provider.id)
            .with("discord", () => (
                <div className="flex items-center justify-center w-full">
                    <DiscordLogoIcon color="#5865F2" className="size-6" />
                    <span className="ml-2">Login with Discord</span>
                </div>
            ))
            .with("google", () => (
                <>
                    <FcGoogle className="size-6" />
                    <span className="ml-2">Login with Google</span>
                </>
            ))
            .with("github", () => (
                <>
                    <GithubIcon className="size-6 stroke-[#9933ff]" />
                    <span className="ml-2">Login with GitHub</span>
                </>
            ))
            .otherwise(() => <span>Sign in with {provider.name}</span>);

        return (
            <Button
                key={provider.id}
                className="w-full"
                onClick={() =>
                    signIn(provider.id, { callbackUrl: "/auth/onboarding" })
                }
                variant="outline"
            >
                {buttonContent}
            </Button>
        );
    };

    const providerButtons = Object.values(providers).map(buildProviderButton);

    return <>{providerButtons}</>;
}

export function SignUpBtn() {
    return (
        <Button className="w-full" variant="outline">
            Sign up
        </Button>
    );
}