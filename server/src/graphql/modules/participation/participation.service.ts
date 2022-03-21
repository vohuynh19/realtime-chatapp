import { CrudService } from "../../../base/crudService";
import { ParticipationModel } from "./participation.model";

class ParticipationService extends CrudService<typeof ParticipationModel> {
  constructor() {
    super(ParticipationModel);
  }
}

const participationService = new ParticipationService();

export { participationService };
