import { NextResponse } from "next/server";
import { contentModel } from "@/models/content";
import dbConnect from "@/lib/dbConnect";

export async function GET(request, { params }) {
  try {
    const resolved = typeof params.then === "function" ? await params : params;
    const key = resolved?.key;
    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }
    await dbConnect();
    const doc = await contentModel.findOne({ key });
    if (!doc) return NextResponse.json(null);
    return NextResponse.json(doc.value);
  } catch {
    return NextResponse.json(
      { error: "Failed to get content" },
      { status: 500 }
    );
  }
}
