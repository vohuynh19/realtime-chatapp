"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const pjson = require("../../../package.json");
if (fs_1.default.existsSync(path_1.default.join(__dirname, "../../../.env"))) {
    console.log(".env exists");
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../../.env") });
}
else {
    console.log(".env not exists");
}
exports.default = {
    name: pjson.name,
    version: pjson.version,
    description: pjson.description,
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET,
    timezone: "Asia/Ho_Chi_Minh",
    domain: `${process.env.DOMAIN}` + process.env.PORT || 3000,
};
//# sourceMappingURL=base.js.map