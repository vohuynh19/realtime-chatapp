"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../loaders/database");
const Schema = mongoose_1.default.Schema;
// Define Schema for mongodb
const notificationSchema = new Schema({
    eventType: { type: String, required: true },
    eventId: { type: String, required: true },
}, { timestamps: true, collation: { locale: "vi" } });
exports.NotificationModel = database_1.MainConnection.model("Notification", notificationSchema);
//# sourceMappingURL=notification.model.js.map