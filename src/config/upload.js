"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            // essa função vai alterar o nome dos arquivos, para evitar conflitos, caso seja feito o upload de 2 arquivos com mesmo nome.
            const fileName = `${Date.now()}-${file.originalname}`;
            // o callback recebe dois parametro, o primeiro e um erro, e o segundo e o resultado
            // como isso e improvavel de dá algum erro, colocamos um valor nulo. 
            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 4 * 1024 * 1024
    }
};
//# sourceMappingURL=upload.js.map