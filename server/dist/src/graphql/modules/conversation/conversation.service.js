"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationService = void 0;
const crudService_1 = require("../../../base/crudService");
const conversation_model_1 = require("./conversation.model");
class ConversationService extends crudService_1.CrudService {
    constructor() {
        super(conversation_model_1.ConversationModel);
    }
}
const conversationService = new ConversationService();
exports.conversationService = conversationService;
//# sourceMappingURL=conversation.service.js.map