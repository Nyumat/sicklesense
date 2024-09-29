import { db } from "@/server/db";
import { User } from "@prisma/client";
import { schedules } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND);

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user as User;
  } catch (error) {
    console.error("Failed to fetch user by id:", error);
    return null;
  }
};

export const sendReminderEmail = async (user: User): Promise<boolean> => {
  if (!user.email) return false;
  if (!resend.emails) return false;
  const email = user.email;
  const name = user.name ?? "there";
  try {
    await resend.emails.send({
      from: "Tom Nyuma <nyuma@nextjudge.org>",
      to: [email],
      subject: `${name}, don't forget to take your medication!`,
      html: `<strong>Hi ${name},</strong><br><br>
        Just a friendly reminder to take your medication today.<br><br>
        Best regards,<br>
        Tom`,
    });
    return true;
  } catch (error) {
    console.error("Failed to send reminder email:", error);
    return false;
  }
};

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
