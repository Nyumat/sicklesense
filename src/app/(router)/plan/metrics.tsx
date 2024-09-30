"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip as TT,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/react";
import { ActivityState } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from 'react';
import { ClimbingBoxLoader, RiseLoader } from "react-spinners";
import { match } from 'ts-pattern';
import CreatePlanDialog from "./(helper)/create-plan-dialog";

export function Metrics() {
    const utils = api.useUtils();
    const currentPlan = api.healthplan.current.useQuery();
    const healthPlans = api.healthplan.healthPlans.useQuery();
    const toggleHealthPlan = api.healthplan.toggleActivityState.useMutation({
        onSuccess: () => {
            utils.healthplan.healthPlans.invalidate();
            utils.healthplan.current.invalidate();
        },
    });

    const currentPlanStatus = currentPlan.data?.activityState ?? "Inactive";
    const nonActiveHealthPlans = healthPlans.data?.filter(plan => plan.activityState !== "Active") ?? [];

    const getPlanStatusColor = (status: ActivityState | undefined) => {
        if (!status) return 'bg-gray-500';
        switch (status) {
            case 'Active': return 'bg-green-500';
            case 'Paused': return 'bg-yellow-500';
            case 'Inactive': return 'bg-red-500';
            case 'Completed': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    return (
        <main className="container flex-1 my-6 overflow-auto space-y-6">
            <div className="flex items-start justify-start gap-2">
                <h1 className="text-3xl font-bold">Your Health Plan</h1>
            </div>

            <div className="flex items-start justify-start gap-2">
                <CreatePlanDialog />
                <Button variant={"outline"} className='p-8 w-1/2'>
                    Edit Plan
                </Button>
            </div>

            {/* Health Plan */}
            <div>
                <h1 className="text-2xl font-bold my-2 pb-4">Current Health Plan</h1>

                {currentPlan.isSuccess && currentPlan.data && (
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
                                        onClick={async () => {
                                            toggleHealthPlan.mutateAsync({ id: currentPlan?.data?.id ?? "", activityState: currentPlanStatus === "Active" ? "Paused" : "Active" })
                                        }}
                                    >
                                        {toggleHealthPlan.status === "pending" ? 'Loading...' : currentPlanStatus === 'Active' ? 'Pause Plan' : 'Activate Plan'}
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                {currentPlan.data.description} <br /><br />
                                <i className='text-xs text-muted-foreground'>Last updated on {moment(currentPlan.data.updatedAt).format('MM/DD/YYYY')}</i>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-col">
                                    <p className="text-sm text-muted-foreground">Plan Name</p>
                                    <p className="text-lg font-bold">{currentPlan.data.title}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm text-muted-foreground">Start Date</p>
                                    <p className="text-lg font-bold">{moment(currentPlan.data.startDate).format('MM/DD/YYYY')}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm text-muted-foreground">End Date</p>
                                    <p className="text-lg font-bold">{moment(currentPlan.data.endDate).format('MM/DD/YYYY')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {!currentPlan.data && !currentPlan.isLoading && (
                    <div className="flex items-center justify-center w-full h-48 rounded-md bg-dot-white/50">
                        <div className="flex flex-col items-center justify-center space-y-2 bg-background/80 p-2 rounded-md">
                            <p className="text-lg">You have no currently active health plans.</p>
                        </div>
                    </div>
                )}

                {currentPlan.isError && (
                    <div className="flex items-center justify-center w-full h-48 rounded-md bg-red-500 text-white">
                        <div className="flex flex-col items-center justify-center space-y-2 bg-background/80 p-2 rounded-md">
                            <p className="text-lg">Failed to load health plan.</p>
                        </div>
                    </div>
                )}

                {currentPlan.isLoading && (
                    <div className="relative flex items-center justify-center w-full h-48 rounded-md bg-dot-white/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <RiseLoader color="#9933ff" size={16} />
                        </div>
                    </div>
                )}
            </div>

            {/* Archive/Inactive Health Plans */}
            <div>
                <h1 className="text-2xl font-bold my-2 pb-4">Inactive Health Plans</h1>
                {!healthPlans.isLoading && nonActiveHealthPlans.length === 0 && (
                    <div className="flex items-center justify-center w-full h-48 rounded-md bg-dot-white/50">
                        <div className="flex flex-col items-center justify-center space-y-2 bg-background/80 p-2 rounded-md">
                            <p className="text-lg">You have no archived health plans.</p>
                        </div>
                    </div>
                )}
                {healthPlans.isLoading && (
                    <div className="relative flex items-center justify-center w-full h-48 rounded-md bg-dot-white/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ClimbingBoxLoader color="#9933ff" size={16} />
                        </div>
                    </div>
                )}
                {nonActiveHealthPlans.length > 0 && (
                    <Accordion type="single" collapsible className="w-full">
                        {nonActiveHealthPlans.map((plan, index) => (
                            <AccordionItem value={`item-${index}`} key={plan.id}>
                                <AccordionTrigger>{plan.title} ({moment(plan.startDate).format('MM/DD/YYYY')} - {moment(plan.endDate).format('MM/DD/YYYY')})</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-row items-center justify-between space-y-4">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-muted-foreground">Plan Name</p>
                                            <p className="text-lg font-bold">{plan.title}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm text-muted-foreground">Start Date</p>
                                            <p className="text-lg font-bold">{moment(plan.startDate).format('MM/DD/YYYY')}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm text-muted-foreground">End Date</p>
                                            <p className="text-lg font-bold">{moment(plan.endDate).format('MM/DD/YYYY')}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{plan.description}</p>
                                    </div>
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <Button variant="outline" size="sm" onClick={async () => {
                                            toggleHealthPlan.mutateAsync({ id: plan.id, activityState: plan.activityState === "Active" ? "Paused" : "Active" })
                                        }}>
                                            {toggleHealthPlan.status === "pending" ? 'Loading...' : plan.activityState === 'Active' ? 'Pause Plan' : 'Activate Plan'}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
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