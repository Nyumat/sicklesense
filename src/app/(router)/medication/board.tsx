"use client"

import { useState } from 'react'
import { format, startOfToday, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from 'date-fns'
import { Calendar as CalendarIcon, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    time: string;
}

interface LogEntry {
    id: number;
    medicationId: number;
    date: Date;
    taken: boolean;
}

export function MedicationTracker() {
    const [medications, setMedications] = useState<Medication[]>([
        { id: 1, name: "Aspirin", dosage: "81mg", frequency: "Daily", time: "08:00" },
        { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Daily", time: "20:00" },
    ])
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday())
    const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false)
    const [newMedication, setNewMedication] = useState<Omit<Medication, 'id'>>({
        name: '',
        dosage: '',
        frequency: 'Daily',
        time: '',
    })

    const addMedication = () => {
        if (newMedication.name && newMedication.dosage && newMedication.time) {
            setMedications([...medications, { ...newMedication, id: Date.now() }])
            setIsAddMedicationOpen(false)
            setNewMedication({ name: '', dosage: '', frequency: 'Daily', time: '' })
        }
    }

    const removeMedication = (id: number) => {
        setMedications(medications.filter(med => med.id !== id))
        setLogs(logs.filter(log => log.medicationId !== id))
    }

    const toggleMedicationTaken = (medicationId: number, date: Date) => {
        const existingLog = logs.find(log => log.medicationId === medicationId && isSameDay(log.date, date))
        if (existingLog) {
            setLogs(logs.map(log =>
                log.id === existingLog.id ? { ...log, taken: !log.taken } : log
            ))
        } else {
            setLogs([...logs, { id: Date.now(), medicationId, date, taken: true }])
        }
    }

    const weekStart = startOfWeek(selectedDate || startOfToday())
    const weekEnd = endOfWeek(selectedDate || startOfToday())
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

    return (
        <div className="container mx-auto my-6">
            <h1 className="text-3xl font-bold mb-6">Medication Tracker</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Medications</CardTitle>
                        <CardDescription>Manage your medications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Dosage</TableHead>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {medications.map((med) => (
                                    <TableRow key={med.id}>
                                        <TableCell>{med.name}</TableCell>
                                        <TableCell>{med.dosage}</TableCell>
                                        <TableCell>{med.frequency}</TableCell>
                                        <TableCell>{med.time}</TableCell>
                                        <TableCell>
                                            <Button variant="destructive" size="sm" onClick={() => removeMedication(med.id)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Dialog open={isAddMedicationOpen} onOpenChange={setIsAddMedicationOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Medication
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Medication</DialogTitle>
                                    <DialogDescription>
                                        Enter the details of the new medication.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={newMedication.name}
                                            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dosage" className="text-right">
                                            Dosage
                                        </Label>
                                        <Input
                                            id="dosage"
                                            value={newMedication.dosage}
                                            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="frequency" className="text-right">
                                            Frequency
                                        </Label>
                                        <Select
                                            value={newMedication.frequency}
                                            onValueChange={(value) => setNewMedication({ ...newMedication, frequency: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Daily">Daily</SelectItem>
                                                <SelectItem value="Weekly">Weekly</SelectItem>
                                                <SelectItem value="As needed">As needed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="time" className="text-right">
                                            Time
                                        </Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            value={newMedication.time}
                                            onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={addMedication}>Add Medication</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>

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
                                        onSelect={setSelectedDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
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
                                            const log = logs.find(l => l.medicationId === med.id && isSameDay(l.date, day))
                                            return (
                                                <TableCell key={day.toISOString()}>
                                                    <Button
                                                        variant={log?.taken ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => toggleMedicationTaken(med.id, day)}
                                                    >
                                                        {log?.taken ? "✓" : "–"}
                                                    </Button>
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}