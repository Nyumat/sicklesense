-- AlterTable
ALTER TABLE "PatientProfile" ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "sickleCellType" DROP NOT NULL,
ALTER COLUMN "Genotype" DROP NOT NULL,
ALTER COLUMN "diagnosisDate" DROP NOT NULL,
ALTER COLUMN "hydroxyureaUsage" DROP NOT NULL,
ALTER COLUMN "bloodTransfusionHistory" DROP NOT NULL,
ALTER COLUMN "physicalActivityLevel" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "travelFrequency" DROP NOT NULL,
ALTER COLUMN "emergencyContact" DROP NOT NULL,
ALTER COLUMN "primaryCarePhysician" DROP NOT NULL,
ALTER COLUMN "hematologistContact" DROP NOT NULL,
ALTER COLUMN "sleepPatterns" DROP NOT NULL,
ALTER COLUMN "energyLevels" DROP NOT NULL,
ALTER COLUMN "painLevel" DROP NOT NULL,
ALTER COLUMN "moodAssessment" DROP NOT NULL,
ALTER COLUMN "communicationPreference" DROP NOT NULL,
ALTER COLUMN "clinicalTrialInterest" DROP NOT NULL,
ALTER COLUMN "dataShareConsent" DROP NOT NULL;
