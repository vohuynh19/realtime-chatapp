import { CrudService } from "../../../base/crudService";
import { MessageModel } from "./message.model";

class MessageService extends CrudService<typeof MessageModel> {
  constructor() {
    super(MessageModel);
  }
}

const messageService = new MessageService();

export { messageService };
