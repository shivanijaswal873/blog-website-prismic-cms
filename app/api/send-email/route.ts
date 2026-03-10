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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (type === "newsletter") {
      const { email } = body;

      if (!email || !emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, message: "Invalid email address" },
          { status: 400 }
        );
      }

      await transporter.sendMail({
        from: `"Website Newsletter" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: " New Newsletter Subscription",
        text: `New subscriber email: ${email}`,
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <hr/>
          <p>This user subscribed to your newsletter.</p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    if (type === "contact") {
      const { name, email, phone, subject, message } = body;

      if (!name || !email || !message || !emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, message: "Required fields missing or invalid email" },
          { status: 400 }
        );
      }

      await transporter.sendMail({
        from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: ` Contact Form - ${subject || "General Inquiry"}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message}
        `,
        html: `
          <h2>New Contact Message</h2>
          <table style="border-collapse: collapse;">
            <tr>
              <td><strong>Name:</strong></td>
              <td>${name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>${phone || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Subject:</strong></td>
              <td>${subject || "General Inquiry"}</td>
            </tr>
          </table>

          <p><strong>Message:</strong></p>
          <p>${message}</p>

          <hr/>
          <p>This message was sent from your website contact form.</p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid form type" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}