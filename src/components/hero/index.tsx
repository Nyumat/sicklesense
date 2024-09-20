"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { GithubIcon, LogOutIcon } from "lucide-react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import SparklesText from "../magicui/sparkle";
import { SparklesCore } from "./particles";

interface HeroSectionProps {
    session: Session | null;
}

export function HeroSection({ session }: HeroSectionProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref);
    const FADE_DOWN_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { type: "spring" } },
    };
    const { theme } = useTheme();
    return (
        <>
            <div className="absolute left-0 top-0 z-0 h-full w-full">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={30}
                    className="size-full"
                    particleColor={
                        theme === "dark" ? "hsl(280,100%,75%)" : "hsl(280,100%,15%)"
                    }
                />
            </div>
            <section className="z-1 relative space-y-6 pb-12 pt-16 md:py-20 lg:py-28">
                <div className="mx-auto max-w-5xl text-center">
                    <motion.div
                        initial="hidden"
                        ref={ref}
                        animate={isInView ? "show" : "hidden"}
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.15,
                                },
                            },
                        }}
                    >
                        <motion.h1
                            variants={FADE_DOWN_ANIMATION_VARIANTS}
                            className="mx-8 font-headingAlt text-6xl font-bold tracking-normal dark:text-[hsl(280,100%,85%)] md:text-8xl"
                        >
                            Personalized <br className="md:hidden" /> Care for
                            <br className="md:hidden" /> Sickle Cell
                            <span className="text-[hsl(280,100%,70%)]/60">
                                {" "}
                                <SparklesText
                                    text="Warriors"
                                    colors={{
                                        first: "hsl(280,100%,85%)",
                                        second: "hsl(280,100%,90%)",
                                    }}
                                    className="text-6xl md:text-8xl"
                                />
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={FADE_DOWN_ANIMATION_VARIANTS}
                            className="mx-auto mt-6 max-w-md text-lg leading-8 lg:max-w-xl"
                        >
                            SickleSense Provides AI-Powered Health Plans Tailored to Your
                            Unique Journey with Sickle Cell Disease.
                        </motion.p>
                        <motion.div
                            variants={FADE_DOWN_ANIMATION_VARIANTS}
                            className="mt-10 flex items-center justify-center gap-x-6"
                        >
                            <Link href={session ? "/dashboard" : "/auth/signin"}>
                                <Button
                                    variant="default"
                                    className="bg-gradient-to-r from-purple-500 to-purple-600"
                                >
                                    {session ? "Dashboard" : "Get Started"}
                                </Button>
                            </Link>

                            <Link
                                href={session ? "/auth/signout" : "/auth/signin"}
                                // TODO: figure out links
                                target="_blank"
                            >
                                <Button
                                    variant="ghost"
                                    className="bg-transparent outline-none hover:bg-transparent/5"
                                >
                                    {session ? (
                                        <LogOutIcon className="mr-2 h-6 w-6" />
                                    ) : (
                                        <GithubIcon className="mr-2 h-6 w-6" />
                                    )}
                                    {session ? "Sign Out" : "Learn More"}
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
