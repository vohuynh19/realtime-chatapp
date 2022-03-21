"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    console.log("url", req.url);
    next();
});
exports.default = router;
//# sourceMappingURL=index.js.map