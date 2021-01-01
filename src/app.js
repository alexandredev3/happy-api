"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// precisamos chamar o arquivo connection aqui no nosso app.
require("./database");
const routes_1 = __importDefault(require("./routes"));
const handle_1 = __importDefault(require("./errors/handle"));
const app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.join(__dirname, '..', 'uploads')));
app.use(routes_1.default);
app.use(handle_1.default);
//# sourceMappingURL=app.js.map