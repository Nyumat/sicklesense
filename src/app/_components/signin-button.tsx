"use client";

import { Button } from "@/components/ui/button";
import { type BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";
import { SignInForm } from "./auth-forms";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { match } from "ts-pattern";

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
        <>
          <DiscordLogoIcon color="#5865F2" className="size-6" />
          <span className="ml-2">Login with Discord</span>
        </>
      ))
      .otherwise(() => <span>Sign in with {provider.name}</span>);

    return (
      <>
        {provider.type === "credentials" && (
          <>
            <SignInForm />
          </>
        )}
        <Button
          className="w-full"
          onClick={() => signIn(provider.id, { callbackUrl: "/auth/onboarding" })}
          variant="outline"
        >
          {buttonContent}
        </Button>
      </>,
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
