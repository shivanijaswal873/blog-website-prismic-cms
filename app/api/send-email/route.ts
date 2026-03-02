export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "shivanijaswal482@gmail.com",
      subject: "New Subscriber",
      html: `<p>User Email: ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}