"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Image_1 = __importDefault(require("../models/Image"));
class FileController {
    async destroy(request, response) {
        const { image_id } = request.params;
        const imageRepository = typeorm_1.getRepository(Image_1.default);
        const imageExists = await imageRepository.findOne(image_id);
        if (!image_id) {
            return response.status(400).json({
                error: 'Id is required.'
            });
        }
        if (!imageExists) {
            return response.status(400).json({
                error: 'Image does not exists.'
            });
        }
        await imageRepository.delete(image_id);
        return response.status(204).send();
    }
}
exports.default = new FileController();
//# sourceMappingURL=FileController.js.map