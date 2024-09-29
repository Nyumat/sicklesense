"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const appointmentSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }),
    type: z.string().min(1, 'Type is required'),
    doctor: z.string().min(1, 'Doctor name is required'),
    notes: z.string().optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentSchema>

export function CreateAppointment() {
    const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormValues | null>(null)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const appointments = api.appointment.appointments.useQuery().data ?? [];
    const utils = api.useUtils();

    const openAppointmentDetails = (appointmentId: string) => {
        const appointment = appointments.find((a) => a.id === appointmentId);
        if (appointment) {
            const { title, date, type, doctor, notes } = appointment;
            setSelectedAppointment({ title, date: new Date(date).toISOString(), type, doctor, notes: notes ?? '' });
            setIsPreviewOpen(true);
        }
    }


    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            title: '',
            date: format(new Date(), 'yyyy-MM-dd'),
            type: '',
            doctor: '',
            notes: '',
        },
    })

    const mutation = api.appointment.addAppointment.useMutation({
        onSuccess: async () => {
            await utils.appointment.invalidate();
            setIsAddAppointmentOpen(false)
            form.reset()
        }
    });

    const onSubmit = (data: AppointmentFormValues) => {
        mutation.mutate({
            ...data,
            notes: data.notes ?? '',
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage your medical appointments</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Doctor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow
                                key={appointment.id}
                                onClick={() => openAppointmentDetails(appointment.id)}
                                className="cursor-pointer"
                            >
                                <TableCell>{format(appointment.date, 'PP')}</TableCell>
                                <TableCell>{appointment.title}</TableCell>
                                <TableCell>{appointment.type}</TableCell>
                                <TableCell>{appointment.doctor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Appointment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Appointment</DialogTitle>
                            <DialogDescription>
                                Enter the details of your new appointment.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Appointment title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Appointment type" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="doctor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Doctor</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doctor's name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Additional notes" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="mt-4">
                                    {mutation.isPending ? 'Adding...' : 'Add Appointment'}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Appointment Details</DialogTitle>
                        </DialogHeader>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold">Title</h4>
                                <p>{selectedAppointment?.title}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Date</h4>
                                <p>{selectedAppointment ? format(new Date(selectedAppointment.date as string).toISOString(), 'PP') : ''}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Type</h4>
                                <p>{selectedAppointment?.type}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Doctor</h4>
                                <p>{selectedAppointment?.doctor}</p>
                            </div>
                            <div className="col-span-2">
                                <h4 className="font-semibold">Notes</h4>
                                <p className="whitespace-pre-wrap">{selectedAppointment?.notes || 'No notes'}</p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}