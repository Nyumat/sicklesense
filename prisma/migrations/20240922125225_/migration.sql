/*
  Warnings:

  - The values [HbSS,HbSC,HbSbetaPlus,HbSbetaZero] on the enum `SickleCellType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SickleCellType_new" AS ENUM ('AA', 'AS', 'SS', 'AC', 'SC');
ALTER TABLE "PatientProfile" ALTER COLUMN "sickleCellType" TYPE "SickleCellType_new" USING ("sickleCellType"::text::"SickleCellType_new");
ALTER TYPE "SickleCellType" RENAME TO "SickleCellType_old";
ALTER TYPE "SickleCellType_new" RENAME TO "SickleCellType";
DROP TYPE "SickleCellType_old";
COMMIT;
