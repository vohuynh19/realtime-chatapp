"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const packageJson = require("../../package.json");
/**
 * Process dotenv
 */
if (fs_1.default.existsSync(path_1.default.join(__dirname, "../../.env"))) {
    console.log(".env exists");
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
}
else {
    throw new Error(".env.example not exists");
}
/**
 * Define configs base class
 */
exports.default = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET || "MYSCRET",
    timezone: "Asia/Ho_Chi_Minh",
    query: {
        limit: 10,
    },
    domain: process.env.DOMAIN || `http://localhost:4000`,
};
//# sourceMappingURL=base.js.map