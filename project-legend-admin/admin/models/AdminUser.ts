import mongoose, { Schema, Document } from "mongoose";

export interface IAdminUser extends Document {
  email: string;
  role: string;
  createdAt: Date;
}

const AdminUserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
