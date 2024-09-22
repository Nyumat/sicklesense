-- CreateTable
CREATE TABLE "Symptom" (
    "id" TEXT NOT NULL,
    "patientProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Symptom" ADD CONSTRAINT "Symptom_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
