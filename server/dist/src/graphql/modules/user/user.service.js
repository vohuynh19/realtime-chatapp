"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const crudService_1 = require("../../../base/crudService");
const user_model_1 = require("./user.model");
class UserService extends crudService_1.CrudService {
    constructor() {
        super(user_model_1.UserModel);
    }
}
const userService = new UserService();
exports.userService = userService;
//# sourceMappingURL=user.service.js.map