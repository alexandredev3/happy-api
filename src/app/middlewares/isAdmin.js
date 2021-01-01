"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
exports.default = async (request, response, next) => {
    const adminUsersRepository = typeorm_1.getRepository(User_1.default);
    const id = request.userId;
    const userIsAdmin = await adminUsersRepository.findOne({
        where: {
            id,
            isAdmin: true
        }
    });
    if (!userIsAdmin) {
        return response.status(401).json({
            status: 401,
            error: 'Restricted Access',
        });
    }
    return next();
};
//# sourceMappingURL=isAdmin.js.map