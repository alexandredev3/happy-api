"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = __importDefault(require("../../lib/Mail"));
exports.default = {
    get key() {
        return 'ResetPasswordMail';
    },
    async handle({ data }) {
        const { name, email, token } = data;
        await Mail_1.default.sendMail({
            to: `${name} - ${email}`,
            from: 'happy@happy.com.br',
            subject: 'Happy - Redefinir Senha',
            template: 'recovery',
            ctx: {
                token,
                name: name
            }
        });
    }
};
//# sourceMappingURL=ResetPasswordMail.js.map