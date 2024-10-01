"use client";

import { SessionProvider } from "next-auth/react";
import AdminPanelLayout from "../_components/admin-panel/admin-panel-layout";
import React from "react";

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
