"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const crudService_1 = require("../../../base/crudService");
const notification_model_1 = require("./notification.model");
class NotificationService extends crudService_1.CrudService {
    constructor() {
        super(notification_model_1.NotificationModel);
    }
}
const notificationService = new NotificationService();
exports.notificationService = notificationService;
//# sourceMappingURL=notification.service.js.map