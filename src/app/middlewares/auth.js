"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../../utils/jwt"));
exports.default = async (request, response, next) => {
    const token = jwt_1.default.extractToken(request);
    jwt_1.default.verify(token)
        .then(({ id }) => {
        request.userId = id;
        next();
    })
        .catch((error) => {
        response.status(401).json({
            status: 401,
            message: 'Invalid authentication token',
            code: 'UNAUTHENTICATED',
        });
    });
};
//# sourceMappingURL=auth.js.map