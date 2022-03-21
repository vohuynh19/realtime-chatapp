"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const configs_1 = require("../configs");
const routers_1 = __importDefault(require("../routers"));
const path_1 = __importDefault(require("path"));
exports.default = ({ app }) => {
    app.use((0, cors_1.default)());
    app.set("port", configs_1.configs.port);
    app.use(body_parser_1.default.json({ limit: "10mb" }));
    app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
    app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../../public")));
    app.use("/", routers_1.default);
};
//# sourceMappingURL=express.js.map