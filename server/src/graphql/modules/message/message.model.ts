import mongoose from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { MainConnection } from "../../../loaders/database";
const Schema = mongoose.Schema;

// Create model interface for readability from mongodb
export type IMessage = BaseDocument & {
  senderId: string; // Sender Id
  conversationId: string; // Conversation Id
  contentType: [string]; // [IMAGE,VIDEO,TEXT]
  imageLink?: string; // Image link
  videoLink?: string; // Video Link
  textContent?: string; // Text Content
  status: string; // SUCCESS/FAIL/PENDING
};

// Define Schema for mongodb
const messageSchema = new Schema(
  {
    senderId: { type: String, required: true },
    conversationId: { type: String, required: true },
    contentType: { type: [String], required: true },
    imageLink: { type: String },
    videoLink: { type: String },
    textContent: { type: String },
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

messageSchema.index({ converstaionId: 1 });

export const MessageModel: mongoose.Model<IMessage> = MainConnection.model(
  "Message",
  messageSchema
);
