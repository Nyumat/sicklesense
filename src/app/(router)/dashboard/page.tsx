"use client";

import { Greeting } from "@/app/(router)/dashboard/(helper)/greeting";
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import { NotificationButton } from "@/app/_components/admin-panel/notification-button";
import { CommandMenu } from "@/app/_components/comand-menu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Activity,
    Bell,
    ChevronRight,
    Droplet,
    Mail,
    PenSquare,
    Search,
    ThermometerSun
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { TourDisplay } from "./(helper)/tour-display";
import tour from "./(helper)/tour-producer";
import React from "react";

export default function DashboardPage() {
    const router = useRouter();
    const ctx = tour.useContext()
    useEffect(() => {
        const tour = localStorage.getItem("tour")
        if (!tour) {
            const promise = new Promise((resolve) => {
                ctx.open()
                resolve(true)
            })

            promise.then(() => {
                localStorage.setItem("tour", "true")
            })
        } else {
            ctx.close()
        }

        return () => {
            ctx.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const summaryText = `As of today's date, your hemoglobin levels are stable. Remember to stay hydrated and
            take your Folic Acid and Hydroxyurea doses today. If you experience any
            symptoms, please contact Dr. Levi, the hematologist we've pulled from your records on SickleSense.`;
    const heartRateData = [
        { time: "12am", rate: 65 },
        { time: "3am", rate: 60 },
        { time: "6am", rate: 62 },
        { time: "9am", rate: 75 },
        { time: "12pm", rate: 85 },
        { time: "3pm", rate: 70 },
        { time: "6pm", rate: 80 },
        { time: "9pm", rate: 72 },
        { time: "9am", rate: 75 },
        { time: "12pm", rate: 85 },
        { time: "6pm", rate: 80 },
        { time: "9pm", rate: 72 },
        { time: "3pm", rate: 70 },
    ];
    return (
        <>
            <ContentLayout title="Dashboard">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">SickleSense</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Home</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col justify-between md:flex-row gap-4">
                    <Greeting />
                    <header className="flex items-center justify-between pb-4">
                        <tour.TourFocus
                            name="search"
                            tourRender={
                                <TourDisplay title="Search Anything">
                                    <p>
                                        Use the search bar to quickly find information on the site!{" "}
                                        <code>Command + K</code> will open the command palette.
                                    </p>
                                </TourDisplay>
                            }
                        >
                            <div className="relative">
                                <CommandMenu />
                            </div>
                        </tour.TourFocus>
                        <div className="ml-4 flex items-center space-x-2">
                            <NotificationButton
                                icon={Bell}
                                notificationCount={2}
                                variant="ghost"
                                size="icon"
                            />
                            <NotificationButton
                                icon={Mail}
                                notificationCount={8}
                                variant="ghost"
                                size="icon"
                            />
                        </div>
                    </header>
                </div>
                <tour.TourFocus name="metrics" tourRender={<TourDisplay title="Health Metrics">
                    <p>
                        These are your current health metrircs. You can add more information under the <b>Profile {">"} My Account </b> tab.
                    </p>
                </TourDisplay>}>

                    <div className="mb-2 grid gap-2 md:grid-cols-2 lg:grid-cols-4 space-y-8">
                        <Card className="bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Hemoglobin</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">9.1 g/dL</div>
                                <p className="text-xs text-muted-foreground">+5% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pain Level</CardTitle>
                                <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2 / 10</div>
                                <p className="text-xs text-muted-foreground">Last updated 2h ago</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Hydration</CardTitle>
                                <Droplet className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">75%</div>
                                <p className="text-xs text-muted-foreground">
                                    Drink 500ml more water
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Oxygen Saturation
                                </CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">96%</div>
                                <p className="text-xs text-muted-foreground">Within normal range</p>
                            </CardContent>
                        </Card>
                    </div>
                </tour.TourFocus>
                <tour.TourFocus name="summary" tourRender={<TourDisplay title="Today's Summary">
                    <p>
                        This is a summary of your health status for today. It includes an AI gathered summary of your health status.
                    </p>
                </TourDisplay>}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Today&apos;s Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{summaryText}</p>
                        </CardContent>
                    </Card>
                </tour.TourFocus>
                <tour.TourFocus name="charts" tourRender={<TourDisplay title="Health Metrics Chart">
                    <p>
                        These charts show the trend of your health metrics over the past week.
                    </p>
                </TourDisplay>}>
                    <div className="grid grid-cols-3 gap-2 py-2 my-4">
                        <Card className="bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                                <Button variant="ghost" size="icon" >
                                    <PenSquare className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">65 BPM</div>
                                <div className="h-[80px]">
                                    {/* Heart rate graph placeholder */}
                                    <div className="flex h-full w-full items-end space-x-1">
                                        {heartRateData.map((data, index) => (
                                            <div
                                                key={index}
                                                className="w-[8%] bg-blue-300"
                                                style={{ height: `${(data.rate / 100) * 100}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Blood Pressure
                                </CardTitle>
                                <Button variant="ghost" size="icon" >
                                    <PenSquare className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">120 mmHg</div>
                                <div className="flex h-[80px] items-center justify-center">
                                    {/* Blood pressure icon placeholder */}
                                    <PuffLoader color={"#9933ff"} size={80} speedMultiplier={0.65} />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                                <Button variant="ghost" size="icon" >
                                    <PenSquare className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">7.5 hrs/day</div>
                                <div className="h-[80px]">
                                    {/* Sleep graph placeholder */}
                                    <div className="flex h-full w-full items-end space-x-1">
                                        {[70, 80, 60, 90, 75, 85, 80].map((value, index) => (
                                            <div
                                                key={index}
                                                className="w-[12%] bg-teal-300"
                                                style={{ height: `${value}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </tour.TourFocus>
                <Card className="col-span-2 my-4">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            SickleSense AI Chatbot
                            <Button variant="ghost" size="sm">
                                <Search className="h-4 w-4" />
                            </Button>
                        </CardTitle>
                        <CardDescription>Start a conversation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="rounded-lg shadow-md bg-purple-100 dark:bg-muted p-4">
                                <p>
                                    SickleSense makes it easier for you to monitor your sickle cell.
                                </p>
                                <p>
                                    You can ask me anything about your health, medications, or
                                    symptom.
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input placeholder="Ask a question..." onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        router.push("/chat")
                                    }
                                }} />
                                <Button size="icon" className="bg-primary" onClick={() => router.push("/chat")}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Suspense fallback={<div>Loading...</div>}>
                    {/* <CreateSymptom /> */}
                </Suspense>
            </ContentLayout>
        </>
    );
}
