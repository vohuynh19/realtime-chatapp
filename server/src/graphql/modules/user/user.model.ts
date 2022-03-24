import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/mongo";
import { BaseDocument } from "../../../base/baseModel";

export type IUser = BaseDocument & {
  email: string; // Email
  username: string; // Username
  avatarUrl: string; // Url of avatar
  dob: Date; // Date of birth
  gender: string; // FEMALE OR MALE
  password: string; // Encoded Password
  role: string; // ADMIN || MEMBER
  isOnline: boolean; // Check user online or not
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, default: "/assets/defaultAvatar.jpg" },
    dob: { type: Date, default: Date.now() },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "MEMBER" },
    isOnline: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ online: 1 });

export const UserModel: mongoose.Model<IUser> = MainConnection.model(
  "User",
  userSchema
);
