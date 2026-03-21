import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import OTP from "@/models/OTP";
import nodemailer from "nodemailer";

// Configuration for Master Admin Gate
const MASTER_ADMIN_EMAIL = "ritikroshanyadav9696@gmail.com";

export async function POST(req: Request) {
  try {
    const { email, type } = await req.json();

    if (!email || !type) {
      return NextResponse.json({ error: "Email and type (signup/login) are required" }, { status: 400 });
    }

    await connectDB();

    if (type === "login") {
      const user = await AdminUser.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: "User not found. Please ask admin for signup approval." }, { status: 404 });
      }
    } else if (type === "signup") {
      const existingUser = await AdminUser.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: "User already exists. Please login." }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in database (overwrites existing ones loosely by relying on TTL, or we just insert a new one)
    await OTP.deleteMany({ email }); // clear previous OTPs for this email to prevent spam
    await OTP.create({ email, otp: otpCode });

    // Determine target email for routing
    // SIGNUP routing -> ONLY to the master admin email.
    // LOGIN routing -> to the existing user's registered email.
    const targetEmail = type === "signup" ? MASTER_ADMIN_EMAIL : email;

    console.log(`[AUTH SYSTEM DEV]: Generated OTP ${otpCode} for ${email} (Routing to: ${targetEmail})`);

    // Send Email using Nodemailer
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const emailSubject = type === "signup" 
        ? `Signup Request OTP for ${email}` 
        : `Admin Dashboard Login OTP`;

      const emailHtml = type === "signup"
        ? `<h2>Action Required: Admin Dashboard Signup Request</h2><p>A new user is trying to register with the email: <b>${email}</b>.</p><p>If you approve this user, provide them with the following verification code:</p><h1 style="color:red; letter-spacing:5px;">${otpCode}</h1><p>This code expires in 5 minutes.</p>`
        : `<h2>Admin Dashboard Login</h2><p>Your verification code for accessing the admin dashboard is:</p><h1 style="color:blue; letter-spacing:5px;">${otpCode}</h1><p>This code expires in 5 minutes.</p>`;

      await transporter.sendMail({
        from: `"Project Legend Admin" <${process.env.SMTP_EMAIL}>`,
        to: targetEmail,
        subject: emailSubject,
        html: emailHtml,
      });
      
      return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
    } else {
      // Graceful fallback for local dev if SMTP is not provided yet
      console.warn("SMTP_EMAIL and SMTP_PASSWORD missing in .env. Logging OTP to console instead of sending email.");
      return NextResponse.json({ message: "OTP generated successfully (check server logs for dev mode)" }, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error generating OTP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
