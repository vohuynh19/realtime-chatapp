"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participationService = void 0;
const crudService_1 = require("../../../base/crudService");
const participation_model_1 = require("./participation.model");
class ParticipationService extends crudService_1.CrudService {
    constructor() {
        super(participation_model_1.ParticipationModel);
    }
}
const participationService = new ParticipationService();
exports.participationService = participationService;
//# sourceMappingURL=participation.service.js.map