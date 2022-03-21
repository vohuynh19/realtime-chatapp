"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../loaders/database");
const Schema = mongoose_1.default.Schema;
// Define Schema for mongodb
const participationSchema = new Schema({
    userId: { type: String, required: true },
    conversationId: { type: String, required: true },
    status: { type: String, default: "CONNECT" },
}, { timestamps: true, collation: { locale: "vi" } });
// data indexing
participationSchema.index({ userId: 1 });
participationSchema.index({ conversationId: 1 });
exports.ParticipationModel = database_1.MainConnection.model("Participation", participationSchema);
//# sourceMappingURL=participation.model.js.map