"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Notification_1 = __importDefault(require("../schemas/Notification"));
class NotificationController {
    async index(request, response) {
        const user_id = request.userId;
        const notificationRepository = typeorm_1.getMongoRepository(Notification_1.default, "mongodb");
        const notifications = await notificationRepository.find({
            where: {
                user_id
            }
        });
        return response.status(200).json(notifications);
    }
    async update(request, response) {
        const { notification_id } = request.params;
        const notificationRepository = typeorm_1.getMongoRepository(Notification_1.default, "mongodb");
        const notification = await notificationRepository.findOne(notification_id);
        if (!notification) {
            return response.status(400).json({
                error: "Notification not found."
            });
        }
        await notificationRepository.update(notification_id, {
            read: true
        });
        return response.status(204).send();
    }
}
exports.default = new NotificationController();
//# sourceMappingURL=NotifiactionController.js.map