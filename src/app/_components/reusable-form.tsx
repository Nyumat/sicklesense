/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

type SchemaType = z.ZodObject<any>;

interface DynamicFormProps {
  schema: SchemaType;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  fieldLabels?: Record<string, string>;
}

const generateLabel = (key: string): string => {
  return key
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formSections = [
  {
    title: "Personal Information",
    fields: [
      "username",
      "dateOfBirth",
      "gender",
      "sickleCellType",
      "genotype",
      "diagnosisDate",
    ],
  },
  {
    title: "Medical Information",
    fields: [
      "hydroxyureaUsage",
      "bloodTransfusionHistory",
      "physicalActivityLevel",
    ],
  },
  {
    title: "Location and Travel",
    fields: ["location", "travelFrequency"],
  },
  {
    title: "Medical Contacts",
    fields: ["primaryCarePhysician", "hematologistContact"],
  },
  {
    title: "Health Metrics",
    fields: ["sleepPatterns", "energyLevels", "painLevel", "moodAssessment"],
  },
  {
    title: "Preferences",
    fields: [
      "communicationPreference",
      "clinicalTrialInterest",
      "dataShareConsent",
    ],
  },
];

export const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  onSubmit,
  defaultValues = {},
  fieldLabels = {},
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const getFieldLabel = (key: string): string => {
    return fieldLabels[key] || generateLabel(key);
  };

  const renderField = (key: string, field: z.ZodTypeAny) => {
    console.log(field);
    const label = getFieldLabel(key);
    if (field instanceof z.ZodString) {
      return (
        <FormField
          control={form.control}
          name={label}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    if (field instanceof z.ZodNumber) {
      return (
        <FormField
          control={form.control}
          name={key}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    if (field instanceof z.ZodBoolean) {
      return (
        <FormField
          control={form.control}
          name={label}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{label}</FormLabel>
              </div>
            </FormItem>
          )}
        />
      );
    }

    if (field instanceof z.ZodDate) {
      return (
        <FormField
          control={form.control}
          name={label}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
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
                    mode="single"
                    selected={field.value}
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
      );
    }

    if (field instanceof z.ZodEnum) {
      const values = JSON.parse(JSON.stringify(field._def.values));
      return (
        <FormField
          control={form.control}
          name={label}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${key}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {values.map((value: string) => (
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
      );
    }

    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {formSections.map((section, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {section.fields.map((key) =>
                  schema.shape[key] ? (
                    <React.Fragment key={key}>
                      {renderField(key, schema.shape[key])}
                    </React.Fragment>
                  ) : null,
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};