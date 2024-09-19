"use client";

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Activity, Heart, Droplet, Thermometer, Settings, LogOut, PauseCircle, CheckCircle, XCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { match } from 'ts-pattern'
import {
    Tooltip as TT,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const heartRateData = [
    { time: '00:00', rate: 62 }, { time: '04:00', rate: 60 }, { time: '08:00', rate: 75 },
    { time: '12:00', rate: 80 }, { time: '16:00', rate: 78 }, { time: '20:00', rate: 72 }
]

const temperatureData = [
    { time: '00:00', temp: 36.6 }, { time: '04:00', temp: 36.5 }, { time: '08:00', temp: 36.7 },
    { time: '12:00', temp: 37.0 }, { time: '16:00', temp: 37.1 }, { time: '20:00', temp: 36.8 }
]

const hydrationData = [
    { time: '00:00', level: 50 }, { time: '04:00', level: 45 }, { time: '08:00', level: 60 },
    { time: '12:00', level: 70 }, { time: '16:00', level: 65 }, { time: '20:00', level: 55 }
]

export function Metrics() {
    const [currentPlanStatus, setCurrentPlanStatus] = useState('active')
    const [archivedPlans, setArchivedPlans] = useState([
        { id: '1', name: 'Previous Altitude Plan', startDate: '01/01/2020', endDate: '12/31/2020', description: 'Focus on moderate altitude exposure.' },
        { id: '2', name: 'Hydration Improvement', startDate: '06/01/2019', endDate: '12/31/2019', description: 'Increase daily water intake.' },
    ])

    const getPlanStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'paused': return 'bg-yellow-500';
            case 'inactive': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    }


    return (
        <main className="container flex-1 my-6 overflow-auto space-y-4">
            <div className="flex items-start justify-start gap-2">
                <h1 className="text-3xl font-bold">Your Health Plan</h1>
            </div>

            <div className="flex items-start justify-start gap-2">
                <Button variant={"outline"} className='p-8 w-1/2'>
                    Create New Plan
                </Button>
                <Button variant={"outline"} className='p-8 w-1/2'>
                    Edit Plan
                </Button>
            </div>

            {/* Health Plan */}
            <div>
                <h1 className="text-2xl font-bold my-2 pb-4">Current Health Plan</h1>

                <Card className={`border-l-4 bg-background relative`}>
                    <span className="absolute top-0 right-0 mr-6 mt-4 z-50">
                        <span className={`relative flex h-3 w-3`}>
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getPlanStatusColor(currentPlanStatus)} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${getPlanStatusColor(currentPlanStatus)}`}></span>
                        </span>
                    </span>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Plan Overview</span>
                            <div className="flex space-x-2 justify-start">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPlanStatus(currentPlanStatus === 'active' ? 'paused' : 'active')}
                                >
                                    {currentPlanStatus === 'active' ? <PauseCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                    {currentPlanStatus === 'active' ? 'Pause Plan' : 'Activate Plan'}
                                </Button>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            For this next plan, we need you to focus on avoiding high altitudes. According to your data, you were above 2000m for 3 days last month, which is a high-risk factor for sickle cell crises.
                            Going forward, we recommend you avoid altitudes above 1500m. <br /><br />
                            <i className='text-xs text-muted-foreground'>Last updated 01/01/2021</i>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col">
                                <p className="text-sm text-muted-foreground">Plan Name</p>
                                <p className="text-lg font-bold">Avoid High Altitudes</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-muted-foreground">Start Date</p>
                                <p className="text-lg font-bold">01/01/2021</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-muted-foreground">End Date</p>
                                <p className="text-lg font-bold">01/01/2022</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>


            {/* Archive/Inactive Health Plans */}
            <div>
                <h1 className="text-2xl font-bold my-2 pb-4">Archived/Inactive Health Plans</h1>
                <Accordion type="single" collapsible className="w-full">
                    {archivedPlans.map((plan, index) => (
                        <AccordionItem value={`item-${index}`} key={plan.id}>
                            <AccordionTrigger>{plan.name} ({plan.startDate} - {plan.endDate})</AccordionTrigger>
                            <AccordionContent>
                                <p>{plan.description}</p>
                                <div className="flex justify-end space-x-2 mt-2">
                                    <Button variant="outline" size="sm" onClick={() => {/* Handle accept logic */ }}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Accept
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => {/* Handle decline logic */ }}>
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Decline
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>


            <div className='flex items-start justify-start gap-2'>
                <h1 className="text-2xl font-bold my-2 pb-4">Wearable Device Metrics</h1>
                <LiveDot status="online" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Heart Rate Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">72 BPM</div>
                        <p className="text-xs text-muted-foreground">Average over last 24 hours</p>
                        <div className="h-[200px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={heartRateData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Temperature Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Body Temperature</CardTitle>
                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">36.8°C</div>
                        <p className="text-xs text-muted-foreground">Current temperature</p>
                        <div className="h-[200px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={temperatureData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Hydration Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hydration Level</CardTitle>
                        <Droplet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">65%</div>
                        <p className="text-xs text-muted-foreground">Current hydration level</p>
                        <div className="h-[200px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={hydrationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="level" stroke="#ffc658" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Sickle Cell Management Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sickle Cell Management Insights</CardTitle>
                        <CardDescription>How your data relates to sickle cell management</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Your heart rate has remained stable, which is good for preventing crises.</li>
                            <li>Body temperature is within normal range, reducing the risk of sickling.</li>
                            <li>Hydration levels are good but could be improved to further reduce sickling risk.</li>
                            <li>Consider increasing water intake during peak temperature hours.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

type Status = 'online' | 'offline' | 'away';

export function LiveDot({ status }: { status: Status }) {
    const [op, setOp] = useState(true);
    const color = match(status)
        .with('online', () => 'bg-green-400')
        .with('offline', () => 'bg-red-400')
        .with('away', () => 'bg-yellow-400')
        .exhaustive();

    const statusText = match(status)
        .with('online', () => 'Your Device is Online')
        .with('offline', () => 'Offline')
        .with('away', () => 'Away')
        .exhaustive();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOp(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <TooltipProvider>
            <TT delayDuration={100} open={op} onOpenChange={setOp}>
                <TooltipTrigger>
                    <span className="relative flex h-3 w-3 my-2" onMouseEnter={() => setOp(true)}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`}></span>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{statusText}</p>
                </TooltipContent>
            </TT>
        </TooltipProvider>
    );
}