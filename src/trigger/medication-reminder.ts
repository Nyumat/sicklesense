import { logger, schedules, wait, task } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const resend = new Resend(process.env.RESEND);

export const medicationReminder = task({
  id: "medication-reminder",
    run: async (payload: { 
        userId: string;
        email: string;
        name: string;
        timestamp: Date;
        timezone: string;
        lastTimestamp?: Date;
  }) => {
    const { data, error } = await resend.emails.send({
      from: "Tom Nyuma <nyuma@nextjudge.org>",
      to: ["nyumat18@gmail.com"],
      subject: "Hello World",
      html: "<strong>It works!</strong>",
    });

    console.log(data, error);

    // The payload contains the last run timestamp that you can use to check if this is the first run
    // And calculate the time since the last run
    const distanceInMs =
      payload.timestamp.getTime() -
      (payload.lastTimestamp ?? new Date()).getTime();

    logger.log("First scheduled tasks", { payload, distanceInMs });

    // Wait for 5 seconds
    await wait.for({ seconds: 5 });

    // Format the timestamp using the timezone from the payload
    const formatted = payload.timestamp.toLocaleString("en-US", {
      timeZone: payload.timezone,
    });

    logger.log(formatted);
  },
});
