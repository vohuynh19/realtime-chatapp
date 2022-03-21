import mongoose from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { MainConnection } from "../../../loaders/database";
const Schema = mongoose.Schema;

// Create model interface for readability from mongodb
export type IConnection = BaseDocument & {
  senderId: string; // Sender Id
  receiverId: string; // Receiver Id
  status: string; // PENDING/SUCCESS/FAIL/CLOSE
};

// Define Schema for mongodb
const connectionSchema = new Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

export const ConnectionModel: mongoose.Model<IConnection> =
  MainConnection.model("Connection", connectionSchema);
