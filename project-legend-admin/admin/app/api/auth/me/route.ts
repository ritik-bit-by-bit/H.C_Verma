import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server missing JWT_SECRET Configuration" }, { status: 500 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Valid session!
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error: any) {
    // Token expired or malformed
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }
}
