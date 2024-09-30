/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../_components/nav";
import React from "react";

export const metadata: Metadata = {
    metadataBase: new URL("https://sicklesense.vercel.app/"),
    title: "About — Sickle Sense",
    description: "Learn more about the creator of Sickle Sense and the features of the platform.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    openGraph: {
        title: "About — Sickle Sense",
        description: "Learn more about the creator of Sickle Sense and the features of the platform.",
        images: [{ url: "/preview.png" }],
    },
};

export default function About() {
    return (
        <>
            <SiteHeader />
            <div className="container mx-auto px-4 md:mt-12 py-16 max-w-4xl font-light">
                <header className="mb-10 relative text-center">
                    <p className="absolute right-32 top-32 left-0 text-muted-foreground text-sm font-normal -rotate-12 scale-150 select-none pointer-events-none">😄</p>
                    <Image
                        className="rounded-full mx-auto mb-6 w-44 h-auto ring-4 ring-primary/20 select-none pointer-events-none"
                        src="/nyuma.png"
                        alt="Profile Picture"
                        width={120}
                        height={120}
                    />
                    <h1 className="text-4xl font-bold mb-4">
                        <a href="https://tomnyuma.rocks" target="_blank" className="text-primary hover:underline">Tom Nyuma</a>
                    </h1>
                    <p className="text-xl text-muted-foreground font-normal">Creator of SickleSense</p>
                </header>
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4 mx-4">About Me</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        Hey! I'm Tom, mostly known as Nyuma. I'm a student at Oregon State University studying Computer Science and
                        aspiring to become a software engineer. In my free time, I enjoy building web-based hobby projects, exploring nature, and writing.
                        <br />
                        <br />
                        As someone who's lived with sickle cell disease for over 20 years, I've experienced first-hand the challenges that come with managing the condition.
                        From frequent hospital visits to managing pain crises, I know how difficult it can be to stay on top of your health and prevent these complications.
                        <br />
                        <br />
                        My favorite contributions in this field are to socially good projects that help others. I've always been extremely passionate about building products that make a difference in people's lives; more recently, those leveraging A.I.
                        <br />
                        <br />
                        I created SickleSense to help people just like me better understand their health and improve their quality of life. There's many things in this application
                        that I wish I had growing up with sickle cell disease, and I'm excited to share it with the world so that <strong>no one has to go through this alone.</strong>
                        <br />
                        <br />
                        A friend of mine informed me about the Afrotech AI Hackathon <span className="line-through">2 weeks into the competition</span>,
                        and I decided to participate in it to build Sickle Sense. Regardless of the outcome,
                        I'm excited to see how this project grows and the impact it has on the sickle cell community. So truly, from me to you, thanks for checking it out!
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4 mx-4">Sickle Sense Features</h2>
                    <div className="grid gap-6 md:grid-cols-2 select-none pointer-events-none">
                        {[{
                            title: "Your Own Health Journal",
                            description: "Log and track your symptoms, medications, and more to better understand your health, and stay on top of your condition.",
                        }, {
                            title: "Scheduled Medication Reminders",
                            description: "Never miss a dose with personalized reminders for your medications.",
                        }, {
                            title: "AI-Powered Health Insights",
                            description: "Utilizing data collected from your journal, wearable devices, and profile, Sickle Sense provides personalized health insights.",
                        }, {
                            title: "Support from the Community",
                            description: "Connect with others in the sickle cell community for support, advice, and even friendship.",
                        }].map((feature) => (
                            <Card key={feature.title}>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <div className="flex space-x-4">
                        <Link href={"https://github.com/nyumat/sicklesense"} passHref target="_blank">
                            <Button variant="link" className="text-foreground">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </Link>
                        <Link href={"https://devpost.com/software/sicklesense"} passHref target="_blank">
                            <Button variant="link" className="text-foreground">
                                Devpost
                            </Button>
                        </Link>
                        <Link href={"https://tomnyuma.rocks"} passHref target="_blank">
                            <Button variant="link" className="text-foreground">
                                My Website
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}