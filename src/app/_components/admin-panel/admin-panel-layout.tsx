"use client";

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Sidebar } from "./sidebar";
import { api } from "@/trpc/react";

export default function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const session = useSession();
    const isOnboarded = api.users.isOnboarded.useQuery();
    if (!session.data?.user) {
        if (!isOnboarded) {
            router.push("/auth/signin");
        }
    }    
    if (!sidebar) return null;
    return (
        <>

            <Sidebar />
            <main
                className={cn(sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72")}
            // className={cn(
            //   "min-h-[calc(100vh_-_56px)] bg-background transition-[margin-left] duration-300 ease-in-out dark:bg-background",
            //   sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
            // )}
            >
                {children}
            </main>
            {/* <footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in-out",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Footer />
      </footer> */}

        </>
    );
}
