"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // retorna apenas um orfanato
    renderOne(image) {
        const { id, path } = image;
        // este metodo vai pegar o orfanato e retornar ele para o meu frontend consumir.
        return {
            id,
            url: `${process.env.APP_URL}/uploads/${path}`
        };
    },
    // retorna varios orfanatos
    renderMany(images) {
        return images.map(image => this.renderOne(image));
    }
};
//# sourceMappingURL=images_view.js.map