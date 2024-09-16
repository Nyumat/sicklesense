import { SignInBtn } from "@/app/_components/signin-button";
import { getServerAuthSession } from "@/server/auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
// export default async function SignIn() {
//   const session = await getServerAuthSession(authOptions);

//   // If the user is already logged in, redirect.
//   if (session) {
//     redirect("/");
//   }

//   const providers = await getProviders();

//   return (
//     <>
//       {Object.values(providers ?? {}).map((provider) => (
//         <div key={provider.name}>
//           <SignInButton provider={provider} />
//         </div>
//       ))}
//     </>
//   );
// }

export default async function SignIn() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/");
  }

  const providers = await getProviders();

  return (
    <div className="py-64">
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
