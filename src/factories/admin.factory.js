"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const User_1 = __importDefault(require("../app/models/User"));
typeorm_seeding_1.define(User_1.default, () => {
    const user = new User_1.default();
    user.name = 'Admin Happy';
    user.email = 'admin@happy.com.br';
    user.password_hash = '12345678';
    user.isAdmin = true;
    return user;
});
//# sourceMappingURL=admin.factory.js.map