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
const User_1 = __importDefault(require("../models/User"));
class UserController {
    async create(request, response) {
        const { name, email, password, confirm_password } = request.body;
        const userRepository = typeorm_1.getRepository(User_1.default);
        const userExists = await userRepository.findOne({
            where: { email: email }
        });
        if (userExists) {
            return response.status(400).json({
                error: 'User already exists'
            });
        }
        if (password !== confirm_password) {
            return response.status(400).json({
                error: 'Password does not match'
            });
        }
        const data = {
            name,
            email,
            password_hash: password,
        };
        const schema = Yup.object().shape({
            name: Yup.string().max(50).required(),
            email: Yup.string().email().required(),
            password_hash: Yup.string().min(8).required(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const user = userRepository.create(data);
        await userRepository.save(user);
        return response.status(204).send();
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map