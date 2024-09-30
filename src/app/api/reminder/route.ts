export const dynamic = "force-dynamic";
// import { medicationReminder } from "@/trigger/medication-reminder";
// import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse } from "next/server";


export function GET(_: Request) {
    return NextResponse.json({ message: "Hello World" });
}
