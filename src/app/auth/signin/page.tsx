import { SignInBtn } from "@/app/_components/signin-button";
import { ArrowLeft } from "lucide-react";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function SignIn() {
    const providers = await getProviders();
    return (
        <div className="py-64">
            <div className="absolute top-4 left-4 m-12">
                <Link href="/">
                    <ArrowLeft
                        className="cursor-pointer"
                        size={20}
                        color="#9933ff"
                    />
                    <span className="text-sm">Back</span>
                </Link>
            </div>
            <div>
                <div className="mx-auto w-[50px] h-[50px]">
                    <Image
                        src="/sicklesense.png"
                        alt="SickleSense Logo"
                        className="rounded-full"
                        width={50}
                        height={50}
                    />
                </div>  
            </div>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Welcome to SickleSense
                    </p>
                </div>
                <div className="grid gap-4">
                    <Suspense fallback={<div className="w-full h-12">
                        Loading...
                    </div>
                    }>
                        <SignInBtn providers={providers} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
