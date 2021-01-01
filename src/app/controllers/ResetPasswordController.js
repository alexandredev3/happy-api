"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const crypto_1 = __importDefault(require("crypto"));
const date_fns_1 = require("date-fns");
const User_1 = __importDefault(require("../models/User"));
const ResetPassword_1 = __importDefault(require("../models/ResetPassword"));
const Mail_1 = __importDefault(require("../../lib/Mail"));
class ResetPasswordController {
    async create(request, response) {
        const { email } = request.body;
        const userRespository = typeorm_1.getRepository(User_1.default, "default");
        const resetPasswordRepository = typeorm_1.getRepository(ResetPassword_1.default, "default");
        const user = await userRespository.findOne({
            where: { email: email }
        });
        if (!user) {
            return response.status(400).json({
                error: 'User does not exists'
            });
        }
        const token = crypto_1.default.randomBytes(20).toString('hex');
        const expiresOn = new Date();
        expiresOn.setMinutes(expiresOn.getMinutes() + 30);
        const resetPassword = resetPasswordRepository.create({
            token,
            expires_on: expiresOn,
            user_id: user.id
        });
        await resetPasswordRepository.delete({
            user_id: user.id
        });
        await resetPasswordRepository.save(resetPassword);
        const { name } = user;
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
        return response.status(204).send();
    }
    async update(request, response) {
        const { token } = request.params;
        const { password, confirm_password } = request.body;
        const userRespository = typeorm_1.getRepository(User_1.default);
        const resetPasswordRepository = typeorm_1.getRepository(ResetPassword_1.default);
        if (!token) {
            return response.status(400).json({
                error: 'Token is required'
            });
        }
        const tokenIsValid = await resetPasswordRepository.findOne({
            where: {
                token: token,
                was_used: false
            }
        });
        if (!tokenIsValid) {
            return response.status(401).json({
                error: 'Token is invalid or has already been used'
            });
        }
        const dateNow = new Date();
        if (!date_fns_1.isBefore(dateNow, tokenIsValid.expires_on)) {
            return response.status(401).json({
                error: 'Token is expired'
            });
        }
        if (password !== confirm_password) {
            return response.status(400).json({
                error: 'Password does not match'
            });
        }
        await resetPasswordRepository.createQueryBuilder()
            .update()
            .set({ was_used: true })
            .where('token = :token', { token })
            .execute();
        /**
         * Quando nós usamos o método "update", a senha e salvo diretamente na base de dados, a senha não passa pelo model.
         * Para nossa senha entrar no método "BeforeUpdate", nós precisamos colocar a senha direto no medel.
         * Porque o "BeforeUpdate" só será executado quando algum dado for alterado no model.
         */
        const user = new User_1.default;
        user.password_hash = password;
        await userRespository.update(tokenIsValid.user_id, user);
        // TypeORM vai executar o método encryptPassword.
        return response.status(204).send();
    }
}
exports.default = new ResetPasswordController();
//# sourceMappingURL=ResetPasswordController.js.map