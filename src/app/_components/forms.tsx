"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { $Enums } from "@prisma/client";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import * as z from 'zod';

const formSchema = z.object({
    dateOfBirth: z.date({ required_error: "Date of birth is required." }).nullable(),
    gender: z.enum(["Male", "Female", "Other"], { required_error: "Please select a gender" }).nullable(),
    genotype: z.enum(['AA', 'AS', 'SS', 'AC', 'SC'], { required_error: "Please select a genotype" }).nullable(),
    diagnosisDate: z.date().nullable(),
    sinceBirth: z.boolean().default(false),
});

interface PersonalInfoFormProps {
    info: {
        dateOfBirth: Date | null;
        gender: $Enums.Gender | null;
        sickleCellType: $Enums.SickleCellType | null;
        diagnosisDate: Date | null;
    } | null | undefined;
}

// TODO: Fix DOB === Diagnosis Date not working

export function PersonalInfoForm({ info }: PersonalInfoFormProps) {

    const mutation = api.users.updatePersonalInfo.useMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sinceBirth: info?.diagnosisDate === info?.dateOfBirth,
            dateOfBirth: info?.dateOfBirth ?? undefined,
            gender: info?.gender ?? undefined,
            genotype: info?.sickleCellType ?? undefined,
            diagnosisDate: info?.diagnosisDate ?? undefined,
        },
    });

    const watchDateOfBirth = form.watch("dateOfBirth");
    const watchSinceBirth = form.watch("sinceBirth");

    React.useEffect(() => {
        if (watchSinceBirth && watchDateOfBirth) {
            form.setValue("diagnosisDate", watchDateOfBirth);
        }
    }, [watchSinceBirth, watchDateOfBirth, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = await mutation.mutateAsync({
            dateOfBirth: values.dateOfBirth?.toISOString() ?? "",
            gender: values.gender ?? "",
            sickleCellType: values.genotype ?? "",
            diagnosisDate: values.diagnosisDate?.toISOString() ?? "",
        });
        form.reset({
            dateOfBirth: data?.dateOfBirth,
            gender: data?.gender,
            genotype: data?.sickleCellType,
            diagnosisDate: data?.diagnosisDate,
        })

        if (mutation.error) {
            toast.error("An error occurred while updating personal information");
            return;
        }

        if (data?.diagnosisDate === data?.dateOfBirth) {
            form.setValue("sinceBirth", true);
        }

        toast.success("Personal information updated successfully");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date Of Birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        captionLayout="dropdown-buttons"
                                        fromYear={1900}
                                        toYear={2025}
                                        mode="single"
                                        selected={field.value ?? new Date()}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="genotype"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sickle Cell Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select sickle cell type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {["AA", "AS", "SS", "AC", "SC"].map((value) => (
                                        <SelectItem key={value} value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <h2 className="text-sm font-semibold">Diagnosis Date</h2>
                <div className="flex flex-row items-center -translate-y-1">
                    <FormField
                        control={form.control}
                        name="diagnosisDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                disabled={watchSinceBirth}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            captionLayout="dropdown-buttons"
                                            fromYear={1900}
                                            toYear={2025}
                                            mode="single"
                                            selected={field.value ?? new Date()}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sinceBirth"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Since Birth
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}