"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("../configs");
const connect = mongoose_1.default.createConnection(configs_1.configs.maindb, {
    socketTimeoutMS: 30000,
    keepAlive: true,
});
exports.MainConnection = connect;
//# sourceMappingURL=mongo.js.map