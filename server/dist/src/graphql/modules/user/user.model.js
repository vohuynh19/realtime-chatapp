"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../loaders/database");
const Schema = mongoose_1.default.Schema;
// Define Schema for mongodb
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    dob: { type: Date, default: Date.now() },
    gender: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true, collation: { locale: "vi" } });
// data indexing
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
exports.UserModel = database_1.MainConnection.model("User", userSchema);
//# sourceMappingURL=user.model.js.map