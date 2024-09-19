import { z } from "zod";

export const Users: User[] = [
  {
    id: 1,
    avatar:
      "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
    messages: [],
    name: "Jane Doe",
  },
  {
    id: 2,
    avatar:
      "https://avatars.githubusercontent.com/u/46255836?v=4",
    messages: [],
    name: "John Doe",
  },
  {
    id: 3,
    avatar:
      "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
    messages: [],
    name: "Elizabeth Smith",
  },
  {
    id: 4,
    avatar:
      "https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg?fmt=webp&h=350",
    messages: [],
    name: "John Smith",
  },
  {
    id: 5,
    avatar:
      "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
    messages: [],
    name: "Jakob Hoeg",
  },
];

export const userData: User[] = [
  {
    id: 1,
    avatar:
      "https://avatars.githubusercontent.com/u/46255836?v=4",
    messages: [
      {
        id: 1,
        avatar:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        name: "Jane Doe",
        message: "Hey, Jakob",
        timestamp: "10:00 AM",
      },
      {
        id: 2,
        avatar:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        name: "Jakob Hoeg",
        message: "Hey!",
        timestamp: "10:01 AM",
      },
      {
        id: 3,
        avatar:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        name: "Jane Doe",
        message: "How are you?",
        timestamp: "10:02 AM",
      },
      {
        id: 4,
        avatar:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        name: "Jakob Hoeg",
        message: "I am good, you?",
        timestamp: "10:03 AM",
      },
      {
        id: 5,
        avatar:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        name: "Jane Doe",
        message: "I am good too!",
        timestamp: "10:04 AM",
      },
      {
        id: 6,
        avatar:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        name: "Jakob Hoeg",
        message: "That is good to hear!",
        timestamp: "10:05 AM",
        isLiked: true,
      },
      {
        id: 7,
        avatar:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        name: "Jane Doe",
        message: "How has your day been so far?",
        timestamp: "10:06 AM",
      },
      {
        id: 8,
        avatar:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        name: "Jakob Hoeg",
        message:
          "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
        timestamp: "10:10 AM",
      },
      {
        id: 9,
        avatar:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        name: "Jane Doe",
        isLoading: true,
      },
    ],
    name: "Jane Doe",
  },
  {
    id: 2,
    avatar:
      "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
    name: "John Doe",
    messages: [],
  },
  {
    id: 3,
    avatar:
      "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
    name: "Elizabeth Smith",
    messages: [],
  },
  {
    id: 4,
    avatar:
      "https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg?fmt=webp&h=350",
    name: "John Smith",
    messages: [],
  },
];

export const ChatBotMessages: Message[] = [
  {
    id: 1,
    avatar: "/",
    name: "ChatBot",
    message: "Hello! How can I help you today?",
    timestamp: "10:00 AM",
    role: "ai",
  },
  {
    id: 2,
    avatar:
      "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
    name: "Jakob Hoeg",
    message: "I need help with my order",
    timestamp: "10:01 AM",
    role: "user",
  },
  {
    id: 3,
    avatar: "/",
    name: "ChatBot",
    message: "Sure! Please provide me with your order number",
    timestamp: "10:02 AM",
    role: "ai",
  },
  {
    id: 4,
    avatar:
      "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
    name: "Jakob Hoeg",
    message: "123456",
    timestamp: "10:03 AM",
    role: "user",
  },
  {
    id: 5,
    avatar: "/",
    name: "ChatBot",
    message: "Thank you! One moment please while I look up your order",
    timestamp: "10:04 AM",
    role: "ai",
  },
  {
    id: 6,
    avatar: "/",
    name: "ChatBot",
    message:
      "I have found your order. It is currently being processed and will be shipped out soon.",
    timestamp: "10:05 AM",
    role: "ai",
  },
  {
    id: 7,
    avatar:
      "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
    name: "Jakob Hoeg",
    message: "Thank you for your help!",
    timestamp: "10:06 AM",
    role: "user",
  },
  {
    id: 8,
    avatar: "/",
    name: "ChatBot",
    message: "You are welcome! Have a great day!",
    isLoading: true,
    timestamp: "10:10 AM",
    role: "ai",
  },
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar:
    "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
  name: "Jakob Hoeg",
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message?: string;
  isLoading?: boolean;
  timestamp?: string;
  role?: string;
  isLiked?: boolean;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}

export const hemoglobinData = [
  { name: "Jan", level: 8.5 },
  { name: "Feb", level: 9.2 },
  { name: "Mar", level: 8.8 },
  { name: "Apr", level: 9.5 },
  { name: "May", level: 9.1 },
  { name: "Jun", level: 8.7 },
];

export const painData = [
  { name: "Mon", level: 3 },
  { name: "Tue", level: 2 },
  { name: "Wed", level: 4 },
  { name: "Thu", level: 3 },
  { name: "Fri", level: 5 },
  { name: "Sat", level: 2 },
  { name: "Sun", level: 1 },
];

export const hydrationData = [{ name: "Current", value: 75 }];

export const oxygenSaturationData = [
  { name: "12 AM", value: 95 },
  { name: "4 AM", value: 94 },
  { name: "8 AM", value: 96 },
  { name: "12 PM", value: 97 },
  { name: "4 PM", value: 95 },
  { name: "8 PM", value: 96 },
];

export const medicationAdherenceData = [
  { name: "Taken", value: 85 },
  { name: "Missed", value: 15 },
];

export const symptomsData = [
  { name: "Fatigue", value: 4 },
  { name: "Joint Pain", value: 3 },
  { name: "Shortness of Breath", value: 2 },
  { name: "Headache", value: 1 },
];

export const formSchema = z.object({
  dateOfBirth: z.date(),
  gender: z.string(),
  sickleCellType: z.enum(["HbSS", "HbSC", "HbSbetaPlus", "HbSbetaZero"]),
  genotype: z.enum(["SCA", "SCT"]),
  diagnosisDate: z.date(),
  complications: z.array(z.string()),
  otherMedicalConditions: z.array(z.string()),
  medications: z.array(z.object({ name: z.string(), dosage: z.string() })),
  hydroxyureaUsage: z.boolean(),
  bloodTransfusionHistory: z.string(),
  painManagementStrategies: z.array(z.string()),
  occupation: z.string().optional(),
  physicalActivityLevel: z.enum(["High", "Moderate", "Low"]),
  dietaryHabits: z.array(z.string()),
  smokingStatus: z.string().optional(),
  alcoholConsumption: z.string().optional(),
  location: z.string(),
  homeEnvironment: z.array(z.string()),
  travelFrequency: z.string(),
  knownTriggerEvents: z.array(
    z.enum([
      "Stress",
      "Infection",
      "Dehydration",
      "Cold",
      "Heat",
      "Exercise",
      "Other",
    ]),
  ),
  allergies: z.array(z.string()),
  emergencyContact: z.object({
    name: z.string(),
    phone: z.string(),
    relation: z.string(),
  }),
  primaryCarePhysician: z.string(),
  hematologistContact: z.string(),
  sleepPatterns: z.enum(["Good", "Poor"]),
  energyLevels: z.enum(["High", "Moderate", "Low"]),
  painLevel: z.enum(["None", "Mild", "Moderate", "Severe"]),
  moodAssessment: z.enum([
    "Happy",
    "Sad",
    "Angry",
    "Anxious",
    "Depressed",
    "Other",
  ]),
  shortTermGoals: z.array(z.string()),
  longTermGoals: z.array(z.string()),
  communicationPreference: z.enum(["Email", "Phone", "SMS", "Other"]),
  clinicalTrialInterest: z.boolean(),
  dataShareConsent: z.boolean(),
});
