/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import React, { useState } from 'react'

const connectToFitbit = (_device: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random() < 0.8)
        }, 2000)
    })
}

export function FitbitConnectWidget() {
    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [applicationId, setApplicationId] = useState("")

    const handleConnect = async () => {
        if (!selectedDevice) {
            setError("Please select a device")
            return
        }

        setIsConnecting(true)
        setError(null)

        try {
            const success = await connectToFitbit(selectedDevice)
            if (success) {
                setIsConnected(true)
                setIsDialogOpen(false)
            } else {
                setError("Failed to connect. Please try again.")
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setIsConnecting(false)
        }
    }

    const handleDisconnect = () => {
        setIsConnected(false)
        setSelectedDevice(null)
    }

    return (
        <div className="my-4">
            <Card>
                <CardHeader>
                    <CardTitle>Fitbit Connection</CardTitle>
                    <CardDescription>Connect your Fitbit device to track your fitness data</CardDescription>
                </CardHeader>
                <CardContent>
                    {isConnected ? (
                        <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>Connected to {selectedDevice}</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 text-yellow-600">
                            <AlertCircle className="h-5 w-5" />
                            <span>Not connected</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant={isConnected ? "outline" : "default"} onClick={isConnected ? handleDisconnect : undefined}>
                                {isConnected ? "Disconnect" : "Connect Fitbit"}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Connect Your Fitbit</DialogTitle>
                                <DialogDescription>
                                    Select your Fitbit device and click connect to sync your fitness data.
                                </DialogDescription>
                            </DialogHeader>
                            <Select onValueChange={(value) => setSelectedDevice(value)} disabled={isConnecting}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your device" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fitbit Charge 5">Fitbit Charge 5</SelectItem>
                                    <SelectItem value="Fitbit Versa 3">Fitbit Versa 3</SelectItem>
                                    <SelectItem value="Fitbit Sense">Fitbit Sense</SelectItem>
                                    <SelectItem value="Fitbit Inspire 2">Fitbit Inspire 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    placeholder="Enter Your Application ID"
                                    value={applicationId}
                                    onChange={(e) => setApplicationId(e.target.value)}
                                    disabled={isConnecting}
                                    className="input"
                                />
                                <p className="text-sm text-gray-500 mt-2">You can find your Application ID in the Fitbit Developer Console.</p>
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )}
                            <DialogFooter>
                                <Button onClick={handleConnect} disabled={isConnecting || !selectedDevice}>
                                    {isConnecting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Connecting...
                                        </>
                                    ) : (
                                        "Connect"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    )
}