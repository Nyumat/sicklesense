import { TimePicker } from '@/app/_components/date-picker';
import { PhoneInput } from '@/app/_components/phone-input';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Medication name is required"),
    dosage: z.string().min(1, "Dosage is required"),
    frequency: z.string().min(1, "Frequency is required"),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format").optional(),
    reminderEnabled: z.boolean(),
    reminderDetails: z.object({
        reminderFrequency: z.string().optional(),
        reminderTime: z.date().optional(),
        reminderPhone: z.string().optional(),
    }).optional(),
});

type MedicationFormValues = z.infer<typeof formSchema>;

export function MedicationFormDialog() {
    const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);

    const utils = api.useUtils();
    const addMedicationMutation = api.medication.addMedication.useMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            dosage: "",
            frequency: "Daily",
            time: "",
            reminderEnabled: false,
            reminderDetails: {
                reminderFrequency: "",
                reminderTime: new Date(),
                reminderPhone: "",
            },
        },
    });

    const onSubmit = (data: MedicationFormValues) => {
        addMedicationMutation.mutate(data, {
            onSuccess: () => {
                utils.medication.invalidate();
                setIsAddMedicationOpen(false);
                form.reset();
            },
        });
    };

    const reminderEnabled = form.watch("reminderEnabled");

    return (
        <Dialog open={isAddMedicationOpen} onOpenChange={setIsAddMedicationOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Medication
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Medication</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new medication.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dosage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dosage</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="frequency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Frequency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Daily">Daily</SelectItem>
                                                <SelectItem value="Weekly">Weekly</SelectItem>
                                                <SelectItem value="As needed">As needed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="reminderEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Enable Reminder
                                        </FormLabel>
                                        <FormDescription>
                                            Set up reminders for this medication
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <AnimatePresence>
                            {reminderEnabled && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="reminderDetails.reminderFrequency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reminder Frequency</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select reminder frequency" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Daily">Daily</SelectItem>
                                                        <SelectItem value="Weekly">Weekly</SelectItem>
                                                        <SelectItem value="Monthly">Monthly</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="reminderDetails.reminderTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reminder Time</FormLabel>
                                                <FormControl>
                                                    <TimePicker hourCycle={12} date={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="reminderDetails.reminderPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number for Reminder</FormLabel>
                                                <FormControl>
                                                    {/* <Input type="tel" {...field} placeholder="Enter phone number" /> */}
                                                    <PhoneInput
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        international={false}
                                                        defaultCountry="US"
                                                        placeholder="Enter a phone number"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" disabled={addMedicationMutation.isPending} onClick={form.handleSubmit(onSubmit)}>
                        {addMedicationMutation.isPending ? 'Adding...' : 'Add Medication'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}