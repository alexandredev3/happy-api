"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const { private_secret, public_secret, expiresIn } = auth_1.default;
const signOptions = {
    expiresIn,
    algorithm: 'RS256'
};
exports.default = {
    extractToken: (request, _) => {
        const authHeader = request.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');
        return token;
    },
    verify: (token) => new Promise((resolve, reject) => {
        const data = jsonwebtoken_1.default.verify(token, public_secret, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return decoded;
        });
        return resolve(data);
    }),
    sign: (payload) => {
        const token = jsonwebtoken_1.default.sign(payload, private_secret, signOptions);
        return token;
    }
};
//# sourceMappingURL=jwt.js.map