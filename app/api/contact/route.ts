import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, email, subject, message } = parsed.data;
  const toEmail = process.env.RESEND_TO_EMAIL || "isharax9@gmail.com";

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
