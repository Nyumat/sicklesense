-- CreateEnum
CREATE TYPE "ActivityState" AS ENUM ('Active', 'Paused', 'Inactive');

-- CreateTable
CREATE TABLE "HealthPlan" (
    "id" TEXT NOT NULL,
    "patientProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "activityState" "ActivityState" NOT NULL DEFAULT 'Active',
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HealthPlan" ADD CONSTRAINT "HealthPlan_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
