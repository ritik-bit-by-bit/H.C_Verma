import { NextResponse } from "next/server";
import { featurePublicationModel } from "@/models/featurePublication";
import dbConnect from "@/lib/dbConnect"
export async function GET() {
  try {
    await dbConnect();
    const featurePublication = await featurePublicationModel.find({});
    return NextResponse.json(featurePublication);
  } catch {
    return NextResponse.json(
      { error: "Failed to get featured publication" },
      { status: 500 }
    );
  }
}
