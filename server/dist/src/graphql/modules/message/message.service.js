"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const crudService_1 = require("../../../base/crudService");
const message_model_1 = require("./message.model");
class MessageService extends crudService_1.CrudService {
    constructor() {
        super(message_model_1.MessageModel);
    }
}
const messageService = new MessageService();
exports.messageService = messageService;
//# sourceMappingURL=message.service.js.map