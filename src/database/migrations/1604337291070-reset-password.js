"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword1604337291070 = void 0;
const typeorm_1 = require("typeorm");
class resetPassword1604337291070 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'reset-password',
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
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'expires_on',
                    type: 'timestamp'
                },
                {
                    name: 'was_used',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'user_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'PasswordTokenUser',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('reset-password');
    }
}
exports.resetPassword1604337291070 = resetPassword1604337291070;
//# sourceMappingURL=1604337291070-reset-password.js.map