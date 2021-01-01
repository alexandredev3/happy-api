"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../app/models/User"));
class CreateAdminUser {
    async run(factory, connection) {
        await factory(User_1.default)().create();
    }
}
exports.default = CreateAdminUser;
//# sourceMappingURL=admin.seed.js.map