"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const graphql_1 = __importDefault(require("./graphql"));
const helpers_1 = require("./helpers");
let server;
const PORT = app_1.default.get("port");
const ENV = app_1.default.get("env");
server = app_1.default.listen(PORT, "0.0.0.0", () => {
    helpers_1.logger.info(`Server is running at http://localhost:${PORT} in ${ENV} mode`);
});
(0, graphql_1.default)(app_1.default, server);
//# sourceMappingURL=server.js.map