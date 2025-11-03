import { User } from "@/types/user";
import mongoose, { Schema, Document } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessSection: { type: String, required: true },
    role: { type: String, enum: ["admin", "operator"], default: "operator" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export interface IUser extends User, Document {}

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModel;
