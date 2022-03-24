"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../helpers/logger");
const express_1 = __importDefault(require("./express"));
exports.default = ({ expressApp }) => {
    /**
     * Load express server
     */
    (0, express_1.default)({ app: expressApp });
    logger_1.logger.info("Load server Successfully!");
};
//# sourceMappingURL=index.js.map