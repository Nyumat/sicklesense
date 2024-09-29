"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Symptom } from "@prisma/client";
import { format } from "date-fns";
import {
    Plus
} from "lucide-react";
import { useState } from "react";

export function CreateSymptom() {
    const [symptoms] = api.symptom.symptoms.useSuspenseQuery();
    const utils = api.useUtils();
    const mutation = api.symptom.addSymptom.useMutation({
        onSuccess: async () => {
            await utils.symptom.invalidate();
            setIsAddSymptomOpen(false)
        }
    });
    const [isAddSymptomOpen, setIsAddSymptomOpen] = useState(false)
    const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id' | 'date' | 'createdAt' | 'updatedAt' | 'patientProfileId'>>({ name: '', severity: 0 })
    
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Symptom Tracker</CardTitle>
                    <CardDescription>Log and monitor your symptoms</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Symptom</TableHead>
                                <TableHead>Severity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {symptoms.map((symptom) => (
                                <TableRow key={symptom.id}>
                                    <TableCell>{format(symptom.date, 'PP')}</TableCell>
                                    <TableCell>{symptom.name}</TableCell>
                                    <TableCell>{symptom.severity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Dialog open={isAddSymptomOpen} onOpenChange={setIsAddSymptomOpen}>
                        <DialogTrigger asChild>
                            <Button variant={"outline"} className={cn("w-full", "outline-dashed opacity-50 hover:opacity-75")}>
                                <Plus className="mr-2 h-4 w-4" /> Log Symptom
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Log New Symptom</DialogTitle>
                                <DialogDescription>
                                    Enter the details of the symptom you&apos;re experiencing.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="symptom-name" className="text-right">
                                        Symptom
                                    </Label>
                                    <Input
                                        id="symptom-name"
                                        value={newSymptom.name}
                                        onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="symptom-severity" className="text-right">
                                        Severity (1-10)
                                    </Label>
                                    <Slider
                                        id="symptom-severity"
                                        min={1}
                                        max={10}
                                        step={1}
                                        value={[newSymptom.severity]}
                                        onValueChange={(value) => setNewSymptom({ ...newSymptom, severity: value[0] ?? 0 })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="w-full" onClick={(e) => {
                                    e.preventDefault()
                                    mutation.mutate(newSymptom)
                                }}>{mutation.isPending ? 'Adding...' : 'Add Symptom'}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </>
    )
}