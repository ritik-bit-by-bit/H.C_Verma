import mongoose from "mongoose";

const featurePublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// 🔥 prevent OverwriteModelError
export const featurePublicationModel =
  mongoose.models.featurePublicationModel ||
  mongoose.model("featurePublicationModel", featurePublicationSchema);
