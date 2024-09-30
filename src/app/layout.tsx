import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { PostsProvider } from "./(router)/community/posts/context";

export const metadata: Metadata = {
    metadataBase: new URL("https://sicklesense.vercel.app/"),
    title: "Sickle Sense — The Sickle Cell Companion of the Future",
    description: "Sickle Sense is an all-in-one platform bridging the gap between you, your data, and better health outcomes for sickle cell patients worldwide.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    openGraph: {
        title: "Sickle Sense — The Sickle Cell Companion of the Future",
        description: "Sickle Sense is an all-in-one platform bridging the gap between you, your data, and better health outcomes for sickle cell patients worldwide.",
        images: [{ url: "/preview.png" }],
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false} // TODO: Maybe enable this in the future (?)
                    disableTransitionOnChange
                >
                    <TRPCReactProvider>
                        <PostsProvider>{children}</PostsProvider>
                    </TRPCReactProvider>
                    <Toaster closeButton richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
