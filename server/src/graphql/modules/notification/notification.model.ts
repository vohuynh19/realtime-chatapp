import mongoose from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { MainConnection } from "../../../loaders/database";
const Schema = mongoose.Schema;

// Create model interface for readability from mongodb
export type INotification = BaseDocument & {
  eventType: string; // Type of notification event (message, connect request,...)
  eventId: string; // Event Id
};

// Define Schema for mongodb
const notificationSchema = new Schema(
  {
    eventType: { type: String, required: true },
    eventId: { type: String, required: true },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

export const NotificationModel: mongoose.Model<INotification> =
  MainConnection.model("Notification", notificationSchema);
