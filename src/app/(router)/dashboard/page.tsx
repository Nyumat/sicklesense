"use client";

import Link from "next/link";
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Greeting } from "@/app/(router)/dashboard/(helper)/greeting";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Droplet,
    Activity,
    ThermometerSun,
    Bell,
    Mail,
    Search,
    PenSquare,
    ChevronRight,
} from "lucide-react";
import { NotificationButton } from "@/app/_components/admin-panel/notification-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus } from "lucide-react";
import { addDays, eachDayOfInterval, endOfWeek, format, isSameDay, startOfToday, startOfWeek } from "date-fns";
import { use, useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";
import tour from "./(helper)/tour-producer";
import { TourDisplay } from "./(helper)/tour-display";

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

interface Symptom {
    id: number;
    name: string;
    severity: number;
    date: Date;
}

interface Appointment {
    id: number;
    title: string;
    date: Date;
    doctor: string;
}

interface HealthMetric {
    date: string;
    painLevel: number;
    fatigueLevel: number;
    hydrationLevel: number;
}

export default function DashboardPage() {
    const ctx = tour.useContext();
    const [medications, setMedications] = useState<Medication[]>([
        { id: 1, name: "Hydroxyurea", dosage: "500mg", frequency: "Daily", time: "08:00" },
        { id: 2, name: "Folic Acid", dosage: "1mg", frequency: "Daily", time: "20:00" },
    ])
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [symptoms, setSymptoms] = useState<Symptom[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: 1, title: "Hematologist Check-up", date: addDays(new Date(), 7), doctor: "Dr. Smith" },
        { id: 2, title: "Pain Management", date: addDays(new Date(), 14), doctor: "Dr. Johnson" },
    ])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday())
    const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false)
    const [isAddSymptomOpen, setIsAddSymptomOpen] = useState(false)
    const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false)
    const [newMedication, setNewMedication] = useState<Omit<Medication, 'id'>>({
        name: '',
        dosage: '',
        frequency: 'Daily',
        time: '',
    })
    const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id' | 'date'>>({
        name: '',
        severity: 0,
    })
    const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
        title: '',
        date: new Date(),
        doctor: '',
    })

    useEffect(() => {
        if (!ctx) return;
        Promise.resolve().then(() => {
            console.log("Opening tour");
            void ctx.open();
        });

        if (ctx.current === ctx.nodes.size) {
            console.log("Closing tour");
            void ctx.close();
        }
    }, [ctx]);

    const healthMetrics: HealthMetric[] = [
        { date: "2023-06-01", painLevel: 3, fatigueLevel: 4, hydrationLevel: 7 },
        { date: "2023-06-02", painLevel: 2, fatigueLevel: 3, hydrationLevel: 8 },
        { date: "2023-06-03", painLevel: 4, fatigueLevel: 5, hydrationLevel: 6 },
        { date: "2023-06-04", painLevel: 3, fatigueLevel: 4, hydrationLevel: 7 },
        { date: "2023-06-05", painLevel: 2, fatigueLevel: 3, hydrationLevel: 9 },
        { date: "2023-06-06", painLevel: 1, fatigueLevel: 2, hydrationLevel: 8 },
        { date: "2023-06-07", painLevel: 3, fatigueLevel: 4, hydrationLevel: 7 },
    ]

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

    const addSymptom = () => {
        if (newSymptom.name && newSymptom.severity) {
            setSymptoms([...symptoms, { ...newSymptom, id: Date.now(), date: new Date() }])
            setIsAddSymptomOpen(false)
            setNewSymptom({ name: '', severity: 0 })
        }
    }

    const addAppointment = () => {
        if (newAppointment.title && newAppointment.date && newAppointment.doctor) {
            setAppointments([...appointments, { ...newAppointment, id: Date.now() }])
            setIsAddAppointmentOpen(false)
            setNewAppointment({ title: '', date: new Date(), doctor: '' })
        }
    }

    const weekStart = startOfWeek(selectedDate || startOfToday())
    const weekEnd = endOfWeek(selectedDate || startOfToday())
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })
    const summaryText = `Your hemoglobin levels are stable. Remember to stay hydrated and
            take your medications as prescribed. If you experience any unusual
            symptoms, please contact your healthcare provider.`;
    const heartRateData = [
        { time: "12am", rate: 65 },
        { time: "3am", rate: 60 },
        { time: "6am", rate: 62 },
        { time: "9am", rate: 75 },
        { time: "12pm", rate: 85 },
        { time: "3pm", rate: 70 },
        { time: "6pm", rate: 80 },
        { time: "9pm", rate: 72 },
        { time: "9am", rate: 75 },
        { time: "12pm", rate: 85 },
        { time: "6pm", rate: 80 },
        { time: "9pm", rate: 72 },
        { time: "3pm", rate: 70 },
    ];
    return (
        <>
                <ContentLayout title="Dashboard">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">SickleSense</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Home</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-col justify-between md:flex-row gap-4">
                        <Greeting />
                        <header className="flex items-center justify-between pb-4">
                            <tour.TourFocus
                                name="search"
                                tourRender={
                                    <TourDisplay title="Search Anything">
                                        <p>
                                            Use the search bar to quickly find information on the site!{" "}
                                            <code>Command + K</code> will open the command palette.
                                        </p>
                                    </TourDisplay>
                                }
                            >
                                <div className="relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform pr-1 text-gray-400" />
                                    <Input className="min-w-80 pl-8" placeholder="Search anything..." />
                                </div>
                            </tour.TourFocus>
                            <div className="ml-4 flex items-center space-x-2">
                                <NotificationButton
                                    icon={Bell}
                                    notificationCount={2}
                                    variant="ghost"
                                    size="icon"
                                />
                                <NotificationButton
                                    icon={Mail}
                                    notificationCount={8}
                                    variant="ghost"
                                    size="icon"
                                />
                            </div>
                        </header>
                    </div>
                    <tour.TourFocus name="metrics" tourRender={<TourDisplay title="Health Metrics">
                        <p>
                            These are your current health metrircs. You can add more information under the <b>Profile {">"} My Account </b> tab.
                        </p>
                    </TourDisplay>}>

                        <div className="mb-2 grid gap-2 md:grid-cols-2 lg:grid-cols-4 space-y-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Hemoglobin</CardTitle>
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">9.1 g/dL</div>
                                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pain Level</CardTitle>
                                    <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2 / 10</div>
                                    <p className="text-xs text-muted-foreground">Last updated 2h ago</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Hydration</CardTitle>
                                    <Droplet className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">75%</div>
                                    <p className="text-xs text-muted-foreground">
                                        Drink 500ml more water
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Oxygen Saturation
                                    </CardTitle>
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">96%</div>
                                    <p className="text-xs text-muted-foreground">Within normal range</p>
                                </CardContent>
                            </Card>
                        </div>
                    </tour.TourFocus>
                    <tour.TourFocus name="summary" tourRender={<TourDisplay title="Today's Summary">
                        <p>
                            This is a summary of your health status for today. It includes an AI gathered summary of your health status.
                        </p>
                    </TourDisplay>}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Today&apos;s Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{summaryText}</p>
                            </CardContent>
                        </Card>
                    </tour.TourFocus>
                    <tour.TourFocus name="charts" tourRender={<TourDisplay title="Health Metrics Chart">
                        <p>
                            These charts show the trend of your health metrics over the past week.
                        </p>
                    </TourDisplay>}>
                    <div className="grid grid-cols-3 gap-2 py-2 my-4">
                        <Card className="bg-blue-500 text-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <PenSquare className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">65 BPM</div>
                                <div className="h-[80px]">
                                    {/* Heart rate graph placeholder */}
                                    <div className="flex h-full w-full items-end space-x-1">
                                        {heartRateData.map((data, index) => (
                                            <div
                                                key={index}
                                                className="w-[8%] bg-blue-300"
                                                style={{ height: `${(data.rate / 100) * 100}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-red-500 text-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Blood Pressure
                                </CardTitle>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <PenSquare className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">120 mmHg</div>
                                <div className="flex h-[80px] items-center justify-center">
                                    {/* Blood pressure icon placeholder */}
                                    <div className="h-12 w-12 rounded-full border-4 border-white"></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-teal-500 text-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <PenSquare className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">87%</div>
                                <div className="h-[80px]">
                                    {/* Sleep graph placeholder */}
                                    <div className="flex h-full w-full items-end space-x-1">
                                        {[70, 80, 60, 90, 75, 85, 80].map((value, index) => (
                                            <div
                                                key={index}
                                                className="w-[12%] bg-teal-300"
                                                style={{ height: `${value}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    </tour.TourFocus>
                    <Card className="col-span-2 my-4">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                SickleSense AI Chatbot
                                <Button variant="ghost" size="sm">
                                    See All Messages
                                </Button>
                            </CardTitle>
                            <CardDescription>Start a conversation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-lg bg-muted p-4">
                                    <p className="text-blue-200">
                                        SickleSense makes it easier for you to monitor your sickle cell.
                                    </p>
                                    <p className="mt-2 text-blue-200">
                                        Our chatbot can answer questions, which is fed <i>your data</i>{" "}
                                        to give responses.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input placeholder="Reply to AI chatbot..." />
                                    <Button size="icon" className="bg-blue-500 text-white">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
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
                                            Enter the details of the symptom you're experiencing.
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
                                        <Button onClick={addSymptom}>Log Symptom</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                </ContentLayout>
        </>
    );
}
