"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../loaders/database");
const Schema = mongoose_1.default.Schema;
// Define Schema for mongodb
const messageSchema = new Schema({
    senderId: { type: String, required: true },
    conversationId: { type: String, required: true },
    contentType: { type: [String], required: true },
    imageLink: { type: String },
    videoLink: { type: String },
    textContent: { type: String },
    status: { type: String, default: "PENDING" },
}, { timestamps: true, collation: { locale: "vi" } });
messageSchema.index({ converstaionId: 1 });
exports.MessageModel = database_1.MainConnection.model("Message", messageSchema);
//# sourceMappingURL=message.model.js.map