"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import React from 'react'

interface HealthMetric {
    date: string;
    painLevel: number;
    fatigueLevel: number;
    hydrationLevel: number;
}

export function HealthMetrics() {
    const healthMetrics: HealthMetric[] = [
        { date: "2024-09-21", painLevel: 3, fatigueLevel: 4, hydrationLevel: 7 },
        { date: "2024-09-22", painLevel: 2, fatigueLevel: 3, hydrationLevel: 8 },
        { date: "2024-09-23", painLevel: 4, fatigueLevel: 5, hydrationLevel: 6 },
        { date: "2024-09-24", painLevel: 3, fatigueLevel: 4, hydrationLevel: 7 },
        { date: "2024-09-25", painLevel: 2, fatigueLevel: 3, hydrationLevel: 9 },
        { date: "2024-09-26", painLevel: 1, fatigueLevel: 2, hydrationLevel: 8 },
        { date: "2024-09-27", painLevel: 3, fatigueLevel: 4, hydrationLevel: 7 },
    ]
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Health Metrics</CardTitle>
                    <CardDescription>Visualize your health trends</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={healthMetrics}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="painLevel" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="fatigueLevel" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                <Area type="monotone" dataKey="hydrationLevel" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </>
    )
    }