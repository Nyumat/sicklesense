"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useLayoutEffect } from "react";
export default function SignOutPage() {
  useLayoutEffect(() => {
    void (async () => {
      await signOut();
    })();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 px-4">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Sickle<span className="text-[hsl(280,100%,70%)]">Sense</span>
      </h1>
      <h4 className="text-2xl font-bold">You have been signed out.</h4>

      <Link
        href="/auth/signin"
        className="flex items-center justify-center rounded-full bg-[hsl(280,100%,70%)] px-8 py-3 font-semibold text-white transition hover:bg-[hsl(280,100%,80%)]"
      >
        Log back in
      </Link>
    </div>
  );
}
