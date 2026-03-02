import { NextResponse } from "next/server";
import { contentModel } from "@/models/content";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { key, value } = body;
    if (!key) {
      return NextResponse.json(
        { error: "Missing key" },
        { status: 400 }
      );
    }
    const doc = await contentModel.findOneAndUpdate(
      { key },
      { key, value },
      { new: true, upsert: true }
    );
    return NextResponse.json(doc.value);
  } catch {
    return NextResponse.json(
      { error: "Failed to set content" },
      { status: 500 }
    );
  }
}
