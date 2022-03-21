import { CrudService } from "../../../base/crudService";
import { ConnectionModel } from "./connection.model";

class ConnectionService extends CrudService<typeof ConnectionModel> {
  constructor() {
    super(ConnectionModel);
  }
}

const connectionService = new ConnectionService();

export { connectionService };
