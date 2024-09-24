/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../_components/nav";

export default function About() {
    return (
        <>
            <SiteHeader />
            <div className="container mx-auto px-4 mt-24 py-16 max-w-3xl font-light">
                <header className="mb-16 text-center">
                    <Image
                        className="rounded-full mx-auto mb-6 w-44 h-auto"
                        src="/nyuma.png"
                        alt="Profile Picture"
                        width={120}
                        height={120}
                    />
                    <h1 className="text-4xl font-bold mb-4">Tom Nyuma</h1>
                    <p className="text-xl text-muted-foreground font-normal">Creator of SickleSense</p>
                </header>
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4">About Nyuma</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        Hey! I'm Tom, mostly known as Nyuma. I'm a student at Oregon State University studying Computer Science and
                        aspiring to become a software engineer.
                        <br />
                        <br />
                        As someone who's lived with sickle cell disease for over 20 years, I've experienced firsthand the challenges that come with managing the condition.
                        <br />
                        <br />
                        I created SickleSense to help people just like me better understand their health and improve their quality of life.
                        I'm excited to see how this project grows and the impact it has on the sickle cell community, thanks for stopping by!
                        <br />
                        <br />
                        I'm passionate about building products that make a difference in people's lives; more recently, those leveraging A.I. My favorite contributions are to socially good projects that help others.
                        <br />
                        <br />
                        A friend of mine informed me about the Afrotech AI Hackathon and I decided to participate in it. I'm excited to see how this project grows and the impact it has on the sickle cell community, thanks for stopping by!
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4">Why?</h2>
                    <p className="text-lg text-muted-foreground">
                        Sickle cell disease is a genetic blood disorder that affects millions of people worldwide. It can cause severe pain, organ damage, and other complications that can be life-threatening.
                        <br />
                        <br />
                        Managing sickle cell disease can be challenging, especially when it comes to tracking symptoms, medications, and appointments. SickleSense aims to make this process easier by providing a centralized platform for patients to monitor their health and communicate with their healthcare providers.
                        <br />
                        <br />
                        The idea for SickleSense was born when I realized that I have trouble remembering the details of when I took my Hydroxyurea medication, which is crucial for managing my sickle cell disease.
                        <br />
                        <br />
                        By creating a digital health journal that's easy to use and accessible from anywhere, I hope to empower sickle cell patients to take control of their health and live their best lives.
                        <br />
                        <br />
                        Cheers to a healthier future for <i>
                            all{" "}
                        </i>{"  "}sickle cell patients! 🩸💉
                        
                        <br />
                        <br />  
                        - Nyuma
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4">Sickle Sense Features</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {[{
                            title: "Health Journal",
                            description: "Track your symptoms, medications, and appointments in one place.",
                        }, {
                            title: "Medication Reminders",
                            description: "Set reminders for your medications so you never miss a dose.",
                        }, {
                            title: "Health Insights",
                            description: "Get personalized insights into your health and well-being.",
                        }, {
                            title: "Community Support",
                            description: "Connect with other sickle cell patients for support and advice.",
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
                    </div>
                </section>
            </div>
        </>
    );
}