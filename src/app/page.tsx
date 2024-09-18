import Link from "next/link";

import { HeroSection } from "@/components/hero";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { SiteHeader } from "./_components/nav";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <SiteHeader />
      <HeroSection />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Sickle<span className="text-[hsl(280,100%,70%)]">Sense</span>
          </h1>
          <h3 className="-mt-8 max-w-2xl text-center text-2xl font-bold">
            Discover personalized care, real-time support, and a community that
            understands.
          </h3>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/auth/signin"}
                className="flex items-center justify-center rounded-full bg-[hsl(280,100%,70%)] px-8 py-3 font-semibold text-white transition hover:bg-[hsl(280,100%,80%)]"
              >
                {session ? "Log out" : "Log in"}
              </Link>
            </div>
          </div>
          {/* {session?.user && <LatestPost />} */}
        </div>
      </main>
    </HydrateClient>
  );
}
