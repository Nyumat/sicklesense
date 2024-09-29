"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from "@/trpc/react";
import { Medication } from "@prisma/client";
import { Reorder } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MedicationFormDialog } from "./medication-form";

export function MedicationTable() {
    const utils = api.useUtils();
    const [isLayoutUnlocked, setLayoutUnlocked] = useState(false);
    const [medications, setMedications] = useState<Omit<Medication, 'PatientProfileId'>[]>([]);
    const getMedications = api.medication.getMedications.useQuery();
    const removeMedicationMutation = api.medication.removeMedication.useMutation({
        onSuccess: () => {
            utils.medication.getMedications.invalidate();
        },
    });
    const removeMedication = (id: string) => {
        if (window.confirm('Are you sure you want to remove this medication?')) {
            removeMedicationMutation.mutate({ id });
        }
    };

    const reorderMedicationsMutation = api.medication.reorderMedications.useMutation({
        onSuccess: () => {
            utils.medication.getMedications.invalidate();
        },
    });

    const handleReorder = (newOrder: Medication[]) => {
        setMedications(newOrder);

        const updatedOrder = newOrder.map((med, index) => ({
            id: med.id,
            order: index,
        }));

        reorderMedicationsMutation.mutate(updatedOrder);
    };

    useEffect(() => {
        if (getMedications.data) {
            setMedications(getMedications.data);
        }
    }, [getMedications.data]);
    return (
        <>
            <ReorderableMedicationsTable
                medications={medications}
                removeMedication={removeMedication}
                updateMedicationsOrder={handleReorder}
                isLayoutUnlocked={isLayoutUnlocked}
                setLayoutUnlocked={setLayoutUnlocked}
            />
        </>
    )
}



const ReorderableMedicationsTable = ({ medications, removeMedication, updateMedicationsOrder, isLayoutUnlocked, setLayoutUnlocked }: {
    medications: Omit<Medication, 'PatientProfileId'>[];
    removeMedication: (id: string) => void;
    updateMedicationsOrder: (medications: Medication[]) => void;
    isLayoutUnlocked: boolean;
    setLayoutUnlocked: (value: boolean) => void;
}) => {
    const [items, setItems] = useState(medications);

    useEffect(() => {
        setItems(medications);
    }, [medications]);

    const handleReorder = (reorderedItems: Medication[]) => {
        if (!isLayoutUnlocked) {
            toast.error('Please unlock the layout to reorder items');
            return;
        }
        setItems(reorderedItems);
        updateMedicationsOrder(reorderedItems);
    };

    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle>Medications</CardTitle>
                <CardDescription>Manage your medications</CardDescription>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setLayoutUnlocked(!isLayoutUnlocked)}
                    className="absolute right-4 top-4"
                >
                    {isLayoutUnlocked ? 'Save' : 'Reorder'}
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Reminders</TableHead>
                            <TableHead>Dosage</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <Reorder.Group as={"tbody"} axis="y" values={items} onReorder={handleReorder}>
                        {items.map((med) => (
                            <Reorder.Item
                                key={med.id}
                                value={med}
                                as={"tr"}
                                className="border-b last:border-b-0"
                            >
                                <TableCell className="font-medium">{med.name}</TableCell>
                                <TableCell>
                                    {med.reminderEnabled ? 'Enabled' : 'Disabled'}
                                </TableCell>
                                <TableCell>{med.dosage}</TableCell>
                                <TableCell>{med.frequency}</TableCell>
                                <TableCell>{med.time}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeMedication(med.id)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </Table>
            </CardContent>
            <CardFooter>
                <MedicationFormDialog />
            </CardFooter>
        </Card>
    );
};

export default ReorderableMedicationsTable;