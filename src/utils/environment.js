"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_URL = exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = exports.MAIL_PASSWORD = exports.MAIL_USER = exports.MAIL_PORT = exports.MAIL_HOST = exports.REDIS_PORT = exports.REDIS_HOST = exports.MONGO_URL = exports.MONGO_TYPE = exports.TYPEORM_DATABASE = exports.TYPEORM_PASSWORD = exports.TYPEORM_USERNAME = exports.TYPEORM_PORT = exports.TYPEORM_HOST = exports.TYPEORM_URL = exports.TYPEORM_TYPE = exports.PRIVATE_SECRET = exports.PUBLIC_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
dotenv_1.default.config({
    path: '../../.env'
});
// Secrets;
_a = process.env, exports.PUBLIC_SECRET = _a.PUBLIC_SECRET, exports.PRIVATE_SECRET = _a.PRIVATE_SECRET;
// Postgres Connection;
_b = process.env, exports.TYPEORM_TYPE = _b.TYPEORM_TYPE, exports.TYPEORM_URL = _b.TYPEORM_URL, exports.TYPEORM_HOST = _b.TYPEORM_HOST, exports.TYPEORM_PORT = _b.TYPEORM_PORT, exports.TYPEORM_USERNAME = _b.TYPEORM_USERNAME, exports.TYPEORM_PASSWORD = _b.TYPEORM_PASSWORD, exports.TYPEORM_DATABASE = _b.TYPEORM_DATABASE;
// Mongo Connection;
_c = process.env, exports.MONGO_TYPE = _c.MONGO_TYPE, exports.MONGO_URL = _c.MONGO_URL;
// Redis Connection;
_d = process.env, exports.REDIS_HOST = _d.REDIS_HOST, exports.REDIS_PORT = _d.REDIS_PORT;
// Service Mail Connection;
_e = process.env, exports.MAIL_HOST = _e.MAIL_HOST, exports.MAIL_PORT = _e.MAIL_PORT, exports.MAIL_USER = _e.MAIL_USER, exports.MAIL_PASSWORD = _e.MAIL_PASSWORD;
// admin credentials
_f = process.env, exports.ADMIN_EMAIL = _f.ADMIN_EMAIL, exports.ADMIN_PASSWORD = _f.ADMIN_PASSWORD;
// App;
exports.APP_URL = process.env.APP_URL;
//# sourceMappingURL=environment.js.map