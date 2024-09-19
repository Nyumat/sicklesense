"use client";

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";
import tour from "@/app/(router)/dashboard/(helper)/tour-producer";

export default function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    if (!sidebar) return null;
    return (
        <>
            <tour.TourProvider>
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
            </tour.TourProvider>
        </>
    );
}
