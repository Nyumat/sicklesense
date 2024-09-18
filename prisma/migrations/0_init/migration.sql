-- CreateEnum
CREATE TYPE "SickleCellType" AS ENUM ('HbSS', 'HbSC', 'HbSbetaPlus', 'HbSbetaZero');

-- CreateEnum
CREATE TYPE "SCDGenotype" AS ENUM ('SCA', 'SCT');

-- CreateEnum
CREATE TYPE "TriggerEvent" AS ENUM ('Stress', 'Infection', 'Dehydration', 'Cold', 'Heat', 'Exercise', 'Other');

-- CreateEnum
CREATE TYPE "PainLevel" AS ENUM ('None', 'Mild', 'Moderate', 'Severe');

-- CreateEnum
CREATE TYPE "MoodAssessment" AS ENUM ('Happy', 'Sad', 'Angry', 'Anxious', 'Depressed', 'Other');

-- CreateEnum
CREATE TYPE "CommunicationPreference" AS ENUM ('Email', 'Phone', 'SMS', 'Other');

-- CreateEnum
CREATE TYPE "SleepPattern" AS ENUM ('Good', 'Poor');

-- CreateEnum
CREATE TYPE "CheckLevel" AS ENUM ('High', 'Moderate', 'Low');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "onboardingState" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "PatientProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "sickleCellType" "SickleCellType" NOT NULL,
    "Genotype" "SCDGenotype" NOT NULL,
    "diagnosisDate" TIMESTAMP(3) NOT NULL,
    "complications" TEXT[],
    "otherMedicalConditions" TEXT[],
    "medications" JSONB[],
    "hydroxyureaUsage" BOOLEAN NOT NULL,
    "bloodTransfusionHistory" TEXT NOT NULL,
    "painManagementStrategies" TEXT[],
    "occupation" TEXT,
    "physicalActivityLevel" "CheckLevel" NOT NULL,
    "dietaryHabits" TEXT[],
    "smokingStatus" TEXT,
    "alcoholConsumption" TEXT,
    "location" TEXT NOT NULL,
    "homeEnvironment" TEXT[],
    "travelFrequency" TEXT NOT NULL,
    "knownTriggerEvents" "TriggerEvent"[],
    "allergies" TEXT[],
    "emergencyContact" JSONB NOT NULL,
    "primaryCarePhysician" TEXT NOT NULL,
    "hematologistContact" TEXT NOT NULL,
    "sleepPatterns" "SleepPattern" NOT NULL,
    "energyLevels" "CheckLevel" NOT NULL,
    "painLevel" "PainLevel" NOT NULL,
    "moodAssessment" "MoodAssessment" NOT NULL,
    "shortTermGoals" TEXT[],
    "longTermGoals" TEXT[],
    "communicationPreference" "CommunicationPreference" NOT NULL,
    "clinicalTrialInterest" BOOLEAN NOT NULL,
    "dataShareConsent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthMetric" (
    "id" TEXT NOT NULL,
    "patientProfileId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "painLevel" "PainLevel" NOT NULL,
    "medication" TEXT,
    "triggerEvent" "TriggerEvent",
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PatientProfile_userId_key" ON "PatientProfile"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientProfile" ADD CONSTRAINT "PatientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMetric" ADD CONSTRAINT "HealthMetric_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

