"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const winston_1 = __importDefault(require("winston"));
const json_beautify_1 = __importDefault(require("json-beautify"));
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console({ level: "info" }),
        new winston_1.default.transports.File({ level: "error", filename: "logs/error.log" }),
        new winston_1.default.transports.File({ filename: "logs/combined.log" }),
    ],
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.json(), winston_1.default.format.metadata({
        fillExcept: ["message", "level", "timestamp", "label", "stack", "_reqId"],
    }), winston_1.default.format.printf((_a) => {
        var { timestamp, stack, level, message, metadata, _reqId } = _a, info = __rest(_a, ["timestamp", "stack", "level", "message", "metadata", "_reqId"]);
        let msg = `[${(0, moment_timezone_1.default)(timestamp).format("YYYY-MM-DD HH:mm:ss")}][${level}]${_reqId ? `[${_reqId}]` : ""} ${message}`;
        if (!lodash_1.default.isEmpty(metadata)) {
            msg += `\n${(0, json_beautify_1.default)(metadata, null, 2, 120)}`;
        }
        if (stack) {
            msg += `\n${lodash_1.default.take(stack.split("\n"), 4).join("\n")}`;
        }
        return msg;
    })),
});
exports.default = logger;
//# sourceMappingURL=logger.js.map