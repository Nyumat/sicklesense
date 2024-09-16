"use client";

import { Feeder } from "@/components/feeder";
import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export function HeroSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
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
            className="font-headingAlt bg-gradient-to-tr from-purple-300/80 to-white/90 bg-clip-text text-4xl font-bold tracking-normal text-transparent sm:text-7xl md:text-9xl"
          >
            <Feeder feed="Latest Blogs" />
            <div className="mb-4"></div>
            Beautifully made thoughts
          </motion.h1>
          <motion.p
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-6 text-lg leading-8"
          >
            A collection of handmade and crafted thought from KiNFiSH
          </motion.p>

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
    </div>
  );
}

export const AltHeroSection = () => {
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <Feeder
            feed="Introducting MD-JSONIFY"
            link="https://twitter.com/KinfishT"
          />

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
            <ProgressBtn />
          </div>
        </div>
      </section>
    </>
  );
};
