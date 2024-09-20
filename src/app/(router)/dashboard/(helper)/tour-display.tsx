"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import React from 'react';
import tour from './tour-producer';

export const TourDisplay = (props: {
    children: React.ReactNode
    title?: string
    description?: string
}) => {

    const ctx = tour.useContext()

    return (
        <Card className="w-[350px] relative">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
                <Button
                    variant="ghost"
                    onClick={ctx.close}
                    className="absolute top-2 right-2"
                >
                    <X size={16} />
                </Button>
            </CardHeader>
            <CardContent>{props.children}</CardContent>
            <CardFooter>
                {ctx.current < ctx.nodes.size - 1 ? (
                    <div className="flex w-full justify-between">
                        <div className='flex gap-2 justify-between w-full'>
                            <Button onClick={ctx.previous} variant={"outline"}>
                                <ArrowLeft size={20} />
                            </Button>
                            <Button onClick={ctx.next} variant={"outline"}>
                                <ArrowRight size={20} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full justify-between">
                        <Button onClick={ctx.previous} variant={"outline"}>
                            <ArrowLeft size={20} />
                        </Button>
                        <Button onClick={ctx.close} variant={"outline"}>
                            Finish Onboaring
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}