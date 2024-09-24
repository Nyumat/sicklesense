-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "MedicationLog" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
