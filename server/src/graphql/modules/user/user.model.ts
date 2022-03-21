import mongoose from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { MainConnection } from "../../../loaders/database";
const Schema = mongoose.Schema;

// Create model interface for readability from mongodb
export type IUser = BaseDocument & {
  email: string; // Email
  username: string; // Username
  avatarUrl: string; // Url of avatar
  dob: Date; // Date of birth
  gender: string; // FEMALE OR MALE
  password: string; // Encoded Password
};

// Define Schema for mongodb
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    dob: { type: Date, default: Date.now() },
    gender: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

// data indexing
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

export const UserModel: mongoose.Model<IUser> = MainConnection.model(
  "User",
  userSchema
);
