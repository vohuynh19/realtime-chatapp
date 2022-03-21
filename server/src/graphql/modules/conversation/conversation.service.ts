import { CrudService } from "../../../base/crudService";
import { ConversationModel } from "./conversation.model";

class ConversationService extends CrudService<typeof ConversationModel> {
  constructor() {
    super(ConversationModel);
  }
}

const conversationService = new ConversationService();

export { conversationService };
