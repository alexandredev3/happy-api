"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = require("path");
const nodemailer_pug_engine_1 = require("nodemailer-pug-engine");
const mail_1 = __importDefault(require("../config/mail"));
class Mail {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({});
        const { host, port, secure, auth } = mail_1.default;
        this.transporter = nodemailer_1.default.createTransport({
            host,
            port,
            secure,
            auth
        });
        this.configureTemplates();
    }
    configureTemplates() {
        const viewPath = path_1.resolve(__dirname, '..', 'app', 'views', 'emails');
        this.transporter.use('compile', nodemailer_pug_engine_1.pugEngine({
            templateDir: viewPath,
            pretty: true
        }));
    }
    sendMail(mailMessage) {
        return this.transporter.sendMail(Object.assign(Object.assign({}, mail_1.default.default), mailMessage));
    }
}
exports.default = new Mail();
//# sourceMappingURL=Mail.js.map