"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
let server;
const PORT = app_1.default.get("port");
const ENV = app_1.default.get("env");
server = app_1.default.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running at http://localhost:%d in %s mode", PORT, ENV);
});
//# sourceMappingURL=server.js.map