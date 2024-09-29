import { CreateAppointment } from "../dashboard/(helper)/appointments"
import { CreateSymptom } from "../dashboard/(helper)/symptoms"
import { HealthMetrics } from "./(helper)/health-metrics"
import { MedicationLogger } from "./(helper)/medication-logger"
import { MedicationTable } from "./(helper)/medication-table"

export function MedicationTracker() {
    return (
        <div className="container mx-auto my-6">
            <h1 className="text-3xl font-bold mb-6">Health Tracker</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MedicationTable />
                <MedicationLogger />
            </div>
            <div className="my-8 space-y-8">
                <CreateAppointment />
                <HealthMetrics />
                <CreateSymptom />
            </div>
        </div>
    )
}