"use client";

import { Button } from "@/components/ui/button";
import { type BuiltInProviderType } from "next-auth/providers/index";
import { type ClientSafeProvider, type LiteralUnion } from "next-auth/react";
import { SignInForm } from "./auth-forms";

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

  //   const buildProviderButton = (provider: ClientSafeProvider) => {
  //     const buttonContent = match(provider.id)
  //       .with("discord", () => (
  //         <>
  //           <DiscordLogoIcon color="#5865F2" className="size-6" />
  //           <span className="ml-2">Login with Discord</span>
  //         </>
  //       ))
  //       .otherwise(() => <span>Sign in with {provider.name}</span>);

  //     return (
  //       <>
  //         {provider.type === "credentials" && (
  //           <>
  //             <SignUpForm />
  //           </>
  //         )}
  //         <Button
  //           className="w-full"
  //           onClick={() => signIn(provider.id)}
  //           variant="outline"
  //         >
  //           {buttonContent}
  //         </Button>
  //       </>
  //     );
  //   };

  //   const providerButtons = Object.values(providers).map(buildProviderButton);

  return <SignInForm />;
}

export function SignUpBtn() {
  return (
    <Button className="w-full" variant="outline">
      Sign up
    </Button>
  );
}
