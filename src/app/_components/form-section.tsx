/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { z } from "zod";

interface FormSectionProps {
    title: string;
    fields: string[];
    schema: z.ZodObject<any>;
    getFieldLabel: (key: string) => string;
    renderField: (key: string, field: z.ZodTypeAny) => React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, fields, schema, renderField }) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {fields.map((key) => schema.shape[key] && (
                    <React.Fragment key={key}>
                        {renderField(key, schema.shape[key])}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>
    );
};
