-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "reminderEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reminderFrequency" TEXT,
ADD COLUMN     "reminderPhone" TEXT,
ADD COLUMN     "reminderTime" TIMESTAMP(3);
