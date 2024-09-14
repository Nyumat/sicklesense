"use client";

import { Button } from "@/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { type BuiltInProviderType } from "next-auth/providers/index";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
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
      <Button
        key={provider.name}
        onClick={() => signIn(provider.id)}
        className="w-full"
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
