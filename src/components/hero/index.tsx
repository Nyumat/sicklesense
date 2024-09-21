"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { GithubIcon, LogOutIcon } from "lucide-react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef } from 'react';
import Slider, { Settings } from "react-slick";
import { toast } from "sonner";
import SparklesText from "../magicui/sparkle";
import { SparklesCore } from "./particles";

interface HeroSectionProps {
    session: Session | null;
}

type Image = {
    dark: string;
    light: string;
    alt: string;
}


export function HeroSection({ session }: HeroSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const { theme } = useTheme();

    const FADE_DOWN_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0, transition: { type: "spring" } },
    };

    const images: Image[] = [
        {
            dark: "/dark.png",
            light: "/light.png",
            alt: "Dashboard",
        },
        {
            dark: "/medication-dark.png",
            light: "/medication-light.png",
            alt: "Medication",
        },
        {
            dark: "/chat-dark.png",
            light: "/chat-light.png",
            alt: "Appointments",
        },
        {
            dark: "/healthplan-dark.png",
            light: "/healthplan-light.png",
            alt: "Health Plan",
        },
        {
            dark: "/metrics-dark.png",
            light: "/metrics-light.png",
            alt: "Metrics",
        }
    ]

    const carouselSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        dotsClass: "slick-dots flex justify-center gap-2 text-white",
        arrows: true,
    };

    const handleGetStarted = () => {
        toast.error("SickleSense is currently in development. Please check back later.");
    }

    const handleInfo = () => {
        window.open("https://github.com/nyumat/sicklesense", "_blank");
    }

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center mt-16">
            <div className="absolute inset-0 z-0">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={30}
                    className="w-full h-full"
                    particleColor={
                        theme === "dark" ? "hsl(280,100%,75%)" : "hsl(280,100%,15%)"
                    }
                />
            </div>
            <div className="container mx-auto px-4 py-12 relative z-10">
                <motion.div
                    className="flex flex-col items-center text-center"
                    initial="hidden"
                    ref={ref}
                    animate={isInView ? "show" : "hidden"}
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
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-normal dark:text-[hsl(280,100%,85%)] max-w-3xl"
                    >
                        Your Sickle Cell Command Center{" "}
                        <span className="text-[hsl(280,100%,70%)]/60 whitespace-normal">
                            Powered by{" "}
                            <SparklesText
                                text="AI"
                                colors={{
                                    first: "hsl(280,100%,85%)",
                                    second: "hsl(280,100%,90%)",
                                }}
                                className="inline-block"
                            />
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                        className="mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8"
                    >
                        Sickle Sense is an all-in-one platform bridging the gap between you, your data, and better health outcomes for sickle cell patients worldwide.{" "}
                    </motion.p>
                    <motion.div
                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >

                        <Button
                            variant="default"
                            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-600"
                            onClick={handleGetStarted}
                        >
                            {session ? "Dashboard" : "Start Your Journey"}
                        </Button>

                        <Button
                            variant="link"
                            className="w-full sm:w-auto bg-transparent outline-none hover:bg-transparent/5"
                            onClick={handleInfo}
                        >
                            {session ? (
                                <LogOutIcon className="mr-2 h-5 w-5" />
                            ) : (
                                <GithubIcon className="mr-2 h-5 w-5" />
                            )}
                            {session ? "Sign Out" : "Learn More"}
                        </Button>

                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 w-full max-w-3xl mx-auto relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg blur-3xl opacity-50 -z-10" />
                        <Slider {...carouselSettings}>
                            {images.map((image, index) => (
                                <div key={index} className="outline-none">
                                    <Image
                                        src={image.dark}
                                        alt={image.alt}
                                        className="w-full h-auto rounded-lg shadow-lg z-50 p-2 border-2 border-accent/20 bg-background aspect-w-16 aspect-h-9"
                                        width={1920}
                                        height={1080}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}