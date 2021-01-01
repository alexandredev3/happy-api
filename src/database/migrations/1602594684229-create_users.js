"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser1602594684229 = void 0;
const typeorm_1 = require("typeorm");
class createUser1602594684229 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    unsigned: true,
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'isAdmin',
                    type: 'boolean',
                    default: false,
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password_hash',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.createUser1602594684229 = createUser1602594684229;
//# sourceMappingURL=1602594684229-create_users.js.map