"use client";

import { Feeder } from "@/components/feeder";
import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import GetStarted from "../gradient-btn";
import Ripple from "../magicui/ripple";
import SparklesText from "../magicui/sparkle";
import { SparklesCore } from "./particles";

export function HeroSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <>
      <div className="absolute left-0 top-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="size-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative mx-auto mt-12 max-w-6xl bg-transparent px-6 lg:px-8">
        <div className="absolute max-w-4xl">
          <Spotlight fill="#9284D4" />
        </div>
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
            <div className="absolute -top-4 -z-10 flex w-full justify-center">
              <div className="animate-pulse-slow h-[310px] w-[310px] max-w-full rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
            </div>
            <div className="absolute -top-4 -z-10 flex w-full justify-center">
              <div className="animate-pulse-slow h-[310px] w-[310px] max-w-full rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
            </div>
            <motion.h1
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="bg-gradient-to-tr from-purple-300/80 to-white/90 bg-clip-text font-headingAlt text-8xl font-bold tracking-normal text-transparent"
            >
              <div className="mb-4"></div>
              Personalized Care for Sickle Cell
              <span className="text-[hsl(280,100%,70%)]/60">
                {" "}
                <SparklesText
                  text="Warriors"
                  colors={{
                    first: "hsl(280,100%,85%)",
                    second: "hsl(280,100%,90%)",
                  }}
                  className="text-8xl text-inherit"
                />
              </span>
            </motion.h1>
            <motion.p
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="mx-auto mt-6 max-w-xl text-lg leading-8"
            >
              SickleSense Provides AI-Powered Health Plans Tailored to Your
              Unique Journey with Sickle Cell Disease.
            </motion.p>

            <Ripple />
            <motion.div
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/posts" className="z-50">
                <Button>Get started</Button>
              </Link>

              <Link
                href="https://github.com/Kinfe123/kinfish-dumpy"
                target="_blank"
                className="z-50"
              >
                <Button
                  variant="ghost"
                  className="bg-transparent outline-none hover:bg-transparent/5"
                >
                  <Github className="mx-2" /> Get the github &nbsp;
                  <span aria-hidden="true">→</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <motion.div
            className="rounded-md"
            initial={{ y: 100, opacity: 0 }} // Image starts from 100px below and fully transparent
            animate={{ y: 0, opacity: 1 }} // Image ends at its original position and fully opaque
            transition={{ type: "spring", stiffness: 50, damping: 20 }} // transition specifications
          >
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              ></motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="absolute left-0 top-0 h-full min-w-full overflow-hidden blur-3xl opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 40% 50% at 50% 0%, #9284D4, transparent)",
          }}
        ></motion.div>
      </div>
    </>
  );
}

export const AltHeroSection = () => {
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <Feeder feed="Introducting MD-JSONIFY" />

          <h1
            className="animate-fade-up font-urban text-balance text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Effortlessly Transmuting Markdown into
            <span className="text-gradient_indigo-purple ml-[0.50rem] font-extrabold">
              JSON Brilliance
            </span>
          </h1>

          <p
            className="animate-fade-up max-w-[42rem] text-balance leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            An optimized and optimal way of dumping your json compatible data
            from markdown data store content :)
          </p>

          <div
            className="animate-fade-up flex items-center justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <GetStarted />
          </div>
        </div>
      </section>
    </>
  );
};
