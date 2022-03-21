import mongoose from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { MainConnection } from "../../../loaders/database";
const Schema = mongoose.Schema;

// Create model interface for readability from mongodb
export type IConversation = BaseDocument & {
  title: string; // Conversation title
  avatarUrl: string; // Avatar URL of conversation
  type: string; // GROUP/PERSONALE11000 duplicate key error collection: myFirstDatabase.
  hostIdArr: [string]; // Host of conversation Array
};

// Define Schema for mongodb //
const conversationSchema = new Schema(
  {
    title: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    type: { type: String, required: true },
    hostIdArr: { type: [String], required: true },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

export const ConversationModel: mongoose.Model<IConversation> =
  MainConnection.model("Conversation", conversationSchema);
