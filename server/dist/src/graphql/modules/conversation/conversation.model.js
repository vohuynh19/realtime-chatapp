"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../loaders/database");
const Schema = mongoose_1.default.Schema;
// Define Schema for mongodb //
const conversationSchema = new Schema({
    title: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    type: { type: String, required: true },
    hostIdArr: { type: [String], required: true },
}, { timestamps: true, collation: { locale: "vi" } });
exports.ConversationModel = database_1.MainConnection.model("Conversation", conversationSchema);
//# sourceMappingURL=conversation.model.js.map