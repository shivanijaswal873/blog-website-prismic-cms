export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type } = body;


    if (type === "newsletter") {
      const { email } = body;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { success: false, message: "Invalid email" },
          { status: 400 }
        );
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Newsletter Subscriber",
        html: `<p><strong>Email:</strong> ${email}</p>`,
      });

      return NextResponse.json({ success: true });
    }

    if (type === "contact") {
      const { name, email, phone, subject, message } = body;

      if (!name || !email || !message) {
        return NextResponse.json(
          { success: false, message: "Required fields missing" },
          { status: 400 }
        );
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Contact Form: ${subject || "No Subject"}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid form type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}