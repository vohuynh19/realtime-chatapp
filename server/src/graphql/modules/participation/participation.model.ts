import mongoose from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { MainConnection } from "../../../loaders/database";
const Schema = mongoose.Schema;

// Create model interface for readability from mongodb
export type IParticipation = BaseDocument & {
  userId: string; // Participant id
  conversationId: string; // Conversation id
  status: string; // CONNECT/DISCONNECT/BANNED
};

// Define Schema for mongodb
const participationSchema = new Schema(
  {
    userId: { type: String, required: true },
    conversationId: { type: String, required: true },
    status: { type: String, default: "CONNECT" },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

// data indexing
participationSchema.index({ userId: 1 });
participationSchema.index({ conversationId: 1 });

export const ParticipationModel: mongoose.Model<IParticipation> =
  MainConnection.model("Participation", participationSchema);
