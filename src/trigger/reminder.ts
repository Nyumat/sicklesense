import { getUserById, sendReminderEmail } from "@/lib/actions";
import { User } from "@prisma/client";
import { schedules } from "@trigger.dev/sdk/v3";

//this task will run when any of the attached schedules trigger
export const reminderTask = schedules.task({
  id: "medicine-reminder",
  run: async (payload) => {
    if (!payload.externalId) {
      throw new Error("externalId is required");
    }
    const user = await getUserById(payload.externalId);
    //send a reminder email
    await sendReminderEmail(user as User);
  },
});
