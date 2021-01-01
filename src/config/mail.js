"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../utils/environment");
exports.default = {
    host: environment_1.MAIL_HOST,
    port: environment_1.MAIL_PORT,
    secure: false,
    auth: {
        user: environment_1.MAIL_USER,
        pass: environment_1.MAIL_PASSWORD
    },
    default: 'Equipe Happy <noreply@happy.com>'
};
//# sourceMappingURL=mail.js.map