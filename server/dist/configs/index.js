"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const development_1 = __importDefault(require("./development"));
const production_1 = __importDefault(require("./production"));
const testing_1 = __importDefault(require("./testing"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function getConfig(environment) {
    if (environment === "development") {
        return development_1.default;
    }
    else if (environment === "production") {
        return production_1.default;
    }
    else if (environment === "testing") {
        return testing_1.default;
    }
    else {
        return development_1.default;
    }
}
const configs = getConfig(process.env.NODE_ENV);
exports.configs = configs;
moment_timezone_1.default.tz.setDefault(configs.timezone);
//# sourceMappingURL=index.js.map