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
const jwt_1 = __importDefault(require("../../utils/jwt"));
const User_1 = __importDefault(require("../models/User"));
class SessionController {
    async create(request, response) {
        const { email, password } = request.body;
        const userRepository = typeorm_1.getRepository(User_1.default);
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        });
        await schema.validate({ email, password }, {
            abortEarly: false
        });
        const user = await userRepository.findOne({
            where: { email: email }
        });
        if (!user) {
            return response.status(400).json({
                status: 400,
                error: 'User does not exists.'
            });
        }
        if (!await (user).comparePassword(password)) {
            return response.status(401).json({
                error: 'Password does not match'
            });
        }
        const { name, id, } = user;
        return response.status(200).json({
            user: {
                id,
                name,
            },
            token: jwt_1.default.sign({ id: user.id })
        });
    }
}
exports.default = new SessionController();
//# sourceMappingURL=SessionController.js.map