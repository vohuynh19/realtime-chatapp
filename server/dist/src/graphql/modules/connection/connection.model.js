"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../loaders/database");
const Schema = mongoose_1.default.Schema;
// Define Schema for mongodb
const connectionSchema = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    status: { type: String, default: "PENDING" },
}, { timestamps: true, collation: { locale: "vi" } });
exports.ConnectionModel = database_1.MainConnection.model("Connection", connectionSchema);
//# sourceMappingURL=connection.model.js.map