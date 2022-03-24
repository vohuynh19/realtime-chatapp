"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
exports.default = Object.assign(Object.assign({}, base_1.default), { env: "testing", maindb: process.env["MONGODB_URI"], debug: false });
//# sourceMappingURL=testing.js.map