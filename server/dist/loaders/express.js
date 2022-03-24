"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const configs_1 = require("../configs");
exports.default = ({ app }) => {
    /**
     * Save port to server
     */
    app.set("port", configs_1.configs.port);
    app.use((0, cors_1.default)());
    /**
     * Parse request to json object
     */
    app.use(body_parser_1.default.json({ limit: "10mb" }));
    app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
    /**
     * Use morgan middleware to logs all request (except /(_ah\/health)|graphql/)
     */
    app.use((0, morgan_1.default)("short", {
        skip: (req) => /(_ah\/health)|graphql/.test(req.originalUrl),
    }));
    /**
     * Set views path for using static files in /public/views
     */
    app.set("views", path_1.default.join(__dirname, "/../../public/views"));
    /**
     * Public all static files in /public directory.
     */
    app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../../public")));
};
//# sourceMappingURL=express.js.map