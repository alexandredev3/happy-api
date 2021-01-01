"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const images_view_1 = __importDefault(require("./images_view"));
exports.default = {
    // retorna apenas um orfanato
    renderOne(orphanage) {
        const { id, name, whatsapp, latitude, longitude, about, instructions, open_on_weekends, opening_hours, images } = orphanage;
        // este metodo vai pegar o orfanato e retornar ele para o meu frontend consumir.
        return {
            id,
            name,
            whatsapp,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images: images_view_1.default.renderMany(images)
        };
    },
    // retorna varios orfanatos
    renderMany(orphanages) {
        return orphanages.map(orphanage => this.renderOne(orphanage));
    }
};
//# sourceMappingURL=orphanages_view.js.map