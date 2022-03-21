"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionService = void 0;
const crudService_1 = require("../../../base/crudService");
const connection_model_1 = require("./connection.model");
class ConnectionService extends crudService_1.CrudService {
    constructor() {
        super(connection_model_1.ConnectionModel);
    }
}
const connectionService = new ConnectionService();
exports.connectionService = connectionService;
//# sourceMappingURL=connection.service.js.map