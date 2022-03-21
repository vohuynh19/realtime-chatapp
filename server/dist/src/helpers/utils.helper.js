"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsHelper = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UtilsHelper {
    constructor() { }
    // Scan all files in folder
    static walkSyncFiles(dir, filelist = []) {
        const files = fs_1.default.readdirSync(dir);
        files.forEach(function (file) {
            if (fs_1.default.statSync(path_1.default.join(dir, file)).isDirectory()) {
                filelist = UtilsHelper.walkSyncFiles(path_1.default.join(dir, file), filelist);
            }
            else {
                filelist.push(path_1.default.join(dir, file));
            }
        });
        return filelist;
    }
}
exports.UtilsHelper = UtilsHelper;
//# sourceMappingURL=utils.helper.js.map