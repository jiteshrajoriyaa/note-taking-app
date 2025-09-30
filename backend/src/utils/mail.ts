import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY not set in environment!");
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html: `<p>${text}</p>`
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Email failed:", err);
  }
}
