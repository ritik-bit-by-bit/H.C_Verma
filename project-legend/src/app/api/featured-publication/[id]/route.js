import { NextResponse } from "next/server";
import { featurePublicationModel } from "@/models/featurePublication";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { title, description, image, link } = body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const doc = await featurePublicationModel.findByIdAndUpdate(
      id,
      { title, description, image, link },
      { new: true }
    );
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch {
    return NextResponse.json(
      { error: "Failed to update featured publication" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const doc = await featurePublicationModel.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ deleted: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete featured publication" },
      { status: 500 }
    );
  }
}
