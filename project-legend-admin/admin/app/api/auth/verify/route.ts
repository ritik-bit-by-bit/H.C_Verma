import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import OTP from "@/models/OTP";

export async function POST(req: Request) {
  try {
    const { email, otp, type } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server missing JWT_SECRET Configuration" }, { status: 500 });
    }

    await connectDB();

    // Verify OTP
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return NextResponse.json({ error: "No active OTP found. It may have expired." }, { status: 400 });
    }

    if (otpRecord.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP code." }, { status: 400 });
    }

    // OTP is valid! Register user if it's a signup.
    if (type === "signup") {
      const existingUser = await AdminUser.findOne({ email });
      if (!existingUser) {
        await AdminUser.create({ email, role: "admin" });
        console.log(`[AUTH]: Successfully registered highly-approved new admin user ${email}`);
      }
    }

    // Erase used OTP to prevent replay attacks
    await OTP.deleteMany({ email });

    // Generate 7-day JWT Session Token
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set HTTP-Only Secure Cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 Days in seconds
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json({ message: "Successfully authenticated!" }, { status: 200 });
  } catch (error: any) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
