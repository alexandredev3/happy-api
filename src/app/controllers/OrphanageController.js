"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
// estamos pegando tudo que esta dentro do yup e colocando dentro de Yup, porque la não tem o export default.
const Orphanage_1 = __importDefault(require("../models/Orphanage"));
const Image_1 = __importDefault(require("../models/Image"));
const orphanages_view_1 = __importDefault(require("../../views/orphanages_view"));
class OrphanageController {
    async show(request, response) {
        const { orphanage_id } = request.params;
        const orphanagesRepository = typeorm_1.getRepository(Orphanage_1.default, "default");
        // ele vai tentar encontrar se não vai retornar um erro.
        const orphanage = await orphanagesRepository.findOne(orphanage_id, {
            relations: ['images'],
            where: {
                isPending: false
            }
        });
        if (!orphanage) {
            return response.status(400).json({
                status: 400,
                message: 'Orphanage not found.'
            });
        }
        return response.json(orphanages_view_1.default.renderOne(orphanage));
    }
    async index(request, response) {
        const orphanagesRepository = typeorm_1.getRepository(Orphanage_1.default, "default");
        // se quiser fazer algum tipo de condição, coloque dentro do find.
        const orphanages = await orphanagesRepository.find({
            relations: ['images', 'users'],
            where: {
                isPending: false
            }
        });
        return response.json(orphanages_view_1.default.renderMany(orphanages));
    }
    async create(request, response) {
        const { name, whatsapp, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = request.body;
        // colocamos o nosso model como parametro no getRepository, agora temos todos os metodos no orphanagesRepository
        const orphanageRepository = typeorm_1.getRepository(Orphanage_1.default, "default");
        // estou forçando a tipagem do request.files, falando que ele e uma array de arquivos.
        // apenas um "hackizinho" quando for trabalhar com multiplos arquivos.
        const requestImages = request.files;
        const images = requestImages.map(image => {
            return { path: image.filename };
        });
        const data = {
            name,
            user_id: request.userId,
            whatsapp,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            whatsapp: Yup.number().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });
        // esse cast converte o campo para o tipo que você colocou no yup.
        const finalData = schema.cast(data);
        await schema.validate(data, {
            abortEarly: false // esta opção vai fazer o yup mostrar todos os erros de validação.
        });
        // aqui ele deixa o orfanato pre criado, ele não cria no banco de dados direto.
        const orphanage = orphanageRepository.create(finalData);
        // aqui ele vai salvar no banco de dados
        // passa o orfanato que criamos como parametro do metodo save.
        await orphanageRepository.save(orphanage);
        // status code 201 e quando alguma coisa foi criada.
        return response.status(201).json(orphanage);
    }
    async update(request, response) {
        const { orphanage_id } = request.params;
        const { name, whatsapp, latitude, longitude, about, instructions, opening_hours, open_on_weekends, } = request.body;
        const orphanageRepository = typeorm_1.getRepository(Orphanage_1.default);
        const imageRepository = typeorm_1.getRepository(Image_1.default);
        const orphanageExists = await orphanageRepository.findOne(orphanage_id);
        if (!orphanageExists) {
            return response.status(400).json({
                error: 'Orphanage does not exists'
            });
        }
        const requestImages = request.files;
        const images = requestImages.map((image) => {
            return {
                path: image.filename
            };
        });
        const data = {
            name,
            whatsapp,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            whatsapp: Yup.number().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required()
        });
        await schema.validate(data, {
            abortEarly: false
        });
        const newImages = images.map((image) => {
            return imageRepository.create({
                path: image.path,
                orphanage_id
            });
        });
        await imageRepository.save(newImages);
        await orphanageRepository.update(orphanage_id, data);
        return response.status(204).send();
    }
    async destroy(request, response) {
        const { orphanage_id } = request.params;
        const orphanageRepository = typeorm_1.getRepository(Orphanage_1.default);
        const orphanageExists = orphanageRepository.findOne(orphanage_id, {
            where: { isPending: false }
        });
        if (!orphanageExists) {
            return response.status(400).json({
                error: 'This orphanage was not registered in the database'
            });
        }
        await orphanageRepository.delete(orphanage_id);
        return response.status(204).send();
    }
}
exports.default = new OrphanageController();
//# sourceMappingURL=OrphanageController.js.map