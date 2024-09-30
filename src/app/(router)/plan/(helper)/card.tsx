"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import React from 'react';

import { Button } from '@/components/ui/button';
import { CheckCircle, PauseCircle } from 'lucide-react';


export function HealthPlanCard() {
    const [currentPlanStatus, setCurrentPlanStatus] = React.useState('active');
    const getPlanStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'paused': return 'bg-yellow-500';
            case 'inactive': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    }
    return (
        <>
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
                        <i className='text-xs text-muted-foreground'>Last updated on 09/25/2024</i>
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
                            <p className="text-lg font-bold">09/10/2024</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <p className="text-lg font-bold">09/30/2024</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}