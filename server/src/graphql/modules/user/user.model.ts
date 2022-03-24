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
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, default: "/assets/defaultAvatar.jpg" },
    dob: { type: Date, default: Date.now() },
    gender: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel: mongoose.Model<IUser> = MainConnection.model(
  "User",
  userSchema
);
