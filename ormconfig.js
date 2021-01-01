"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./src/utils/environment");
const path_1 = require("path");
module.exports = [
    {
        name: 'default',
        type: environment_1.TYPEORM_TYPE,
        host: environment_1.TYPEORM_HOST,
        port: environment_1.TYPEORM_PORT,
        username: environment_1.TYPEORM_USERNAME,
        password: environment_1.TYPEORM_PASSWORD,
        database: environment_1.TYPEORM_DATABASE,
        ssl: {
            rejectUnauthorized: false
        },
        migrations: [
            "./src/database/migrations/*.js",
        ],
        factories: ['./src/factories/*.js'],
        entities: [path_1.join(__dirname, 'src', 'app', 'models', '*.js')],
        cli: {
            migrationsDir: "./src/database/migrations",
        },
    },
    {
        name: 'mongodb',
        type: environment_1.MONGO_TYPE,
        url: environment_1.MONGO_URL,
        useUnifiedTopology: true,
        logging: true,
        entities: [path_1.join(__dirname, 'src', 'app', 'schemas', '*.js')],
    },
];
//# sourceMappingURL=ormconfig.js.map