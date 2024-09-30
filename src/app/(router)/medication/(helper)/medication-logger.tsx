"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/react";
import { Medication, MedicationLog } from "@prisma/client";
import { eachDayOfInterval, endOfWeek, format, isSameDay, startOfToday, startOfWeek } from 'date-fns';
import debounce from 'lodash/debounce';
import { Calendar as CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useState } from 'react';

interface PendingLog {
    medicationId: string;
    date: Date;
    taken: boolean;
}

export function MedicationLogger() {
    const [medications, setMedications] = useState<Omit<Medication, 'PatientProfileId'>[]>([]);
    const [logs, setLogs] = useState<Omit<MedicationLog, 'PatientProfileId'>[]>([]);
    const [pendingLogs, setPendingLogs] = useState<PendingLog[]>([]);
    const [selectedDate, setSelectedDate] = useState(startOfToday());

    const utils = api.useUtils();
    const getMedications = api.medication.getMedications.useQuery();
    const getMedicationLogs = api.medication.getMedicationLogs.useQuery({
        startDate: startOfWeek(selectedDate),
        endDate: endOfWeek(selectedDate),
    });
    const logMedicationMutation = api.medication.logMedication.useMutation({
        onSuccess: () => {
            utils.medication.getMedicationLogs.invalidate();
        },
    });

    useEffect(() => {
        if (getMedications.data) setMedications(getMedications.data);
    }, [getMedications.data]);

    useEffect(() => {
        if (getMedicationLogs.data) setLogs(getMedicationLogs.data);
    }, [getMedicationLogs.data]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedLogMedications = useCallback(
        debounce((logs: PendingLog[]) => {
            logs.forEach(log => {
                logMedicationMutation.mutate(log);
            });
            setPendingLogs([]);
        }, 2000),
        [logMedicationMutation]
    );

    useEffect(() => {
        if (pendingLogs.length > 0) {
            debouncedLogMedications(pendingLogs);
        }
    }, [pendingLogs, debouncedLogMedications]);

    const toggleMedicationTaken = (medicationId: string, date: Date) => {
        const existingLog = logs.find(log => log.medicationId === medicationId && isSameDay(log.date, date));
        const newTakenStatus = existingLog ? !existingLog.taken : true;

        // Update local state immediately
        setLogs(prevLogs => {
            const updatedLogs = prevLogs.filter(log => !(log.medicationId === medicationId && isSameDay(log.date, date)));
            return [...updatedLogs, { medicationId, date, taken: newTakenStatus } as Omit<MedicationLog, 'PatientProfileId'>];
        });

        // Add to pending logs
        setPendingLogs(prevPending => [
            ...prevPending.filter(log => !(log.medicationId === medicationId && isSameDay(log.date, date))),
            { medicationId, date, taken: newTakenStatus }
        ]);
    };

    const weekStart = startOfWeek(selectedDate || startOfToday());
    const weekEnd = endOfWeek(selectedDate || startOfToday());
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Medication Log</CardTitle>
                <CardDescription>Track your medication intake</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                    setSelectedDate(date as Date);
                                    getMedicationLogs.refetch();
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                {getMedicationLogs.isLoading ? (
                    <p>Loading medication logs...</p>
                ) : getMedicationLogs.isError ? (
                    <p>Error loading medication logs: {getMedicationLogs.error.message}</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Medication</TableHead>
                                {weekDays.map((day) => (
                                    <TableHead key={day.toISOString()}>{format(day, 'EEE')}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {medications.map((med) => (
                                <TableRow key={med.id}>
                                    <TableCell>{med.name}</TableCell>
                                    {weekDays.map((day) => {
                                        const log = logs.find(l => l.medicationId === med.id && isSameDay(new Date(l.date), day));
                                        const isPending = pendingLogs.some(l => l.medicationId === med.id && isSameDay(l.date, day));
                                        return (
                                            <TableCell key={day.toISOString()}>
                                                <Button
                                                    variant={log?.taken ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => toggleMedicationTaken(med.id, day)}
                                                    className={isPending ? "opacity-50" : ""}
                                                >
                                                    {log?.taken ? "✓" : "–"}
                                                </Button>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}