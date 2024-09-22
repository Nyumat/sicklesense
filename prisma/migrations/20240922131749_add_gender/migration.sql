/*
  Warnings:

  - The `gender` column on the `PatientProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- AlterTable
ALTER TABLE "PatientProfile" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";
