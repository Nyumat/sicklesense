export const dynamic = "force-dynamic"; // static by default, unless reading the request
// import { medicationReminder } from "@/trigger/medication-reminder";
// import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse } from "next/server";


export function GET(request: Request) {
    return NextResponse.json({ message: "Hello World" });
}
