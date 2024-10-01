import { SignUpForm } from "@/app/_components/auth-forms";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

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
