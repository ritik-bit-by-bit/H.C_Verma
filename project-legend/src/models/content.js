import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const contentModel =
  mongoose.models.contentModel ||
  mongoose.model("contentModel", contentSchema);
