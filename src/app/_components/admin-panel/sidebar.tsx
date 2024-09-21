import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                "bg-background fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
                sidebar?.isOpen === false ? "w-[90px]" : "w-72",
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
                <Button
                    className={cn(
                        "mb-1 transition-transform duration-300 ease-in-out",
                        sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
                    )}
                    variant="link"
                    asChild
                >
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            alt="SickleSense"
                            src="/sicklesense.png"
                            width={40}
                            height={40}
                        />
                        <h1
                            className={cn(
                                "whitespace-nowrap bg-gradient-to-r from-[#FA5C5F] via-[#9592d3] to-[#0BACB4] bg-clip-text font-mono text-lg font-bold text-transparent transition-[transform,opacity,display] duration-300 ease-in-out",
                                sidebar?.isOpen === false
                                    ? "hidden -translate-x-96 opacity-0"
                                    : "-translate-x-4 opacity-100",
                            )}
                        >
                            Sickle Sense
                        </h1>
                    </Link>
                </Button>
                <Menu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    );
}
