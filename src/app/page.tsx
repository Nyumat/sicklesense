import { HeroSection } from "@/components/hero";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { SiteHeader } from "./_components/nav";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <SiteHeader />
      <HeroSection session={session} />
    </HydrateClient>
  );
}
