"use client";

import { SessionProvider } from "next-auth/react";
import AdminPanelLayout from "../_components/admin-panel/admin-panel-layout";

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SessionProvider>
                <AdminPanelLayout>
                    {children}
                </AdminPanelLayout>
            </SessionProvider>
        </> 
    );
}
