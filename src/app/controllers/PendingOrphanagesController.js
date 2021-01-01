"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const orphanages_view_1 = __importDefault(require("../../views/orphanages_view"));
const Orphanage_1 = __importDefault(require("../models/Orphanage"));
const Notification_1 = __importDefault(require("../schemas/Notification"));
class PendingOrphanagesController {
    async index(request, response) {
        const orphanageRepository = typeorm_1.getRepository(Orphanage_1.default);
        const orphanagesPending = await orphanageRepository.find({
            where: { isPending: true },
            relations: ['images']
        });
        return response.status(200).json(orphanages_view_1.default.renderMany(orphanagesPending));
    }
    async update(request, response) {
        const { orphanage_id } = request.params;
        const notificationRepository = typeorm_1.getMongoRepository(Notification_1.default, "mongodb");
        const orphanageRepository = typeorm_1.getRepository(Orphanage_1.default);
        const orphanage = await orphanageRepository.findOne(orphanage_id, {
            relations: ['users']
        });
        if (!orphanage) {
            return response.status(400).json({
                error: 'Orphanage does not exists!'
            });
        }
        await orphanageRepository.update(orphanage_id, {
            isPending: false
        });
        const { name, users } = orphanage;
        const notification = notificationRepository.create({
            user_id: users.id,
            title: 'O orfanato que você cadastrou foi aceito!',
            content: `Ebaaa!! O orfanato ${name} 
      foi aceito! Agora outras pessoas podem ver e entrar
      em contado com o orfanato que você cadastrou.`
        });
        await notificationRepository.save(notification);
        return response.status(204).send();
    }
    async destroy(request, response) {
        const { orphanage_id } = request.params;
        const notificationRepository = typeorm_1.getMongoRepository(Notification_1.default, "mongodb");
        const orphanageRepository = typeorm_1.getRepository(Orphanage_1.default);
        const orphanage = await orphanageRepository.findOne(orphanage_id, {
            relations: ['users']
        });
        if (!orphanage) {
            return response.status(400).json({
                error: 'Orphanage does not exists.'
            });
        }
        const { name, users } = orphanage;
        const notification = notificationRepository.create({
            user_id: users.id,
            title: "Infelizmente o orfanato que você cadastrou NÃO foi aceito.",
            content: `O orfanato ${name} não será visto por ninguém, se você achar que isso é um erro, entre em contato pelo E-mail <alo@happy.com.br>.`
        });
        // await orphanageRepository.delete(orphanage_id);
        await notificationRepository.save(notification);
        return response.status(204).send();
    }
}
exports.default = new PendingOrphanagesController();
//# sourceMappingURL=PendingOrphanagesController.js.map