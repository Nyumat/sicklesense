import Link from "next/link";

import { SignInBtn } from "@/app/_components/signin-button";
import { getServerAuthSession } from "@/server/auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SignUpForm } from "@/app/_components/auth-forms";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export const iframeHeight = "800px";

export const containerClassName = "w-full h-full p-4 lg:p-0";
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

export default async function SignUp() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="py-64">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Welcome to SickleSense
          </p>
        </div>
        <div className="grid gap-4">
            <SignUpForm />
        </div>
      </div>
    </div>
  );
}
