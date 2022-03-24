"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_1 = require("../../../loaders/mongo");
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, default: "/assets/defaultAvatar.jpg" },
    dob: { type: Date, default: Date.now() },
    gender: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
exports.UserModel = mongo_1.MainConnection.model("User", userSchema);
//# sourceMappingURL=user.model.js.map