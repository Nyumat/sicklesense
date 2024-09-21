import { ModeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import { HeaderMobile } from "./header-mobile";
import { MainNav } from "./site-header-mobile";

export async function SiteHeader() {
    const session = await getServerAuthSession();
    return (
        <section>
            <div className="block md:hidden">
                <HeaderMobile session={session} />
            </div>
            <div className="hidden md:block">
                <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-center overflow-hidden rounded-b-sm border-b px-3 backdrop-blur-lg">

                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            alt="SickleSense"
                            src="/sicklesense.png"
                            width={40}
                            height={40}
                        />
                        <h1
                            className={cn(
                                "whitespace-nowrap bg-gradient-to-r from-[#8b39b1] via-[#c80f3aaa] to-[#9E44F0] bg-clip-text font-mono text-lg font-bold text-transparent transition-[transform,opacity,display] duration-300 ease-in-out -ml-1",
                            )}
                        >
                            Sickle Sense
                        </h1>
                    </Link>

                    <div className="flex h-full w-full max-w-6xl items-center justify-center gap-2.5">
                        <div className="mx-auto flex h-full flex-grow items-center justify-center">
                            <MainNav
                                items={[
                                    {
                                        title: "Home",
                                        href: "/",
                                    },
                                    {
                                        title: "About",
                                        href: "/about",
                                    },
                                    {
                                        title: "Contact",

                                        href: "/contact",
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <nav>
                                <ModeToggle />
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        </section>
    );
}
