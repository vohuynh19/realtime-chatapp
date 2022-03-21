"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const configs_1 = require("./configs");
const graphql_1 = __importDefault(require("./graphql"));
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log(`App is running at ${configs_1.configs.domain} in %s mode`, app_1.default.get("env"));
    console.log("Press CTRL-C to stop\n");
});
(0, graphql_1.default)(app_1.default, server);
exports.default = server;
//# sourceMappingURL=server.js.map