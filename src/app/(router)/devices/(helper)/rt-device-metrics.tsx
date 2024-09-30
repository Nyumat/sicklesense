"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Heart, Thermometer } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { LiveDot } from "../../plan/metrics";

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

export function RealTimeDeviceMetrics() {
    return (
        <main className="container flex-1 my-6 overflow-auto space-y-6">
            <div className='flex items-start justify-start gap-2'>
                <h1 className="text-2xl font-bold my-2">Wearable Device Metrics</h1>
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
                        <CardTitle>Sickle Sense Curated Insights</CardTitle>
                        <CardDescription>Based on your wearable device metrics, here are some insights to help you manage your sickle cell condition.</CardDescription>
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