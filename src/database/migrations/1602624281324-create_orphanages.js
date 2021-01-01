"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrphanages1602624281324 = void 0;
const typeorm_1 = require("typeorm");
class createOrphanages1602624281324 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            // aqui vai os campos dessa tabela;
            name: 'orphanages',
            columns: [
                // Colunas
                {
                    name: 'id',
                    type: 'uuid',
                    unsigned: true,
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'isPending',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'name',
                    type: 'varchar' // string "curto"
                },
                {
                    name: 'whatsapp',
                    type: 'integer'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'opening_hours',
                    type: 'varchar'
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false // valor padrão vai ser falso.
                }
            ],
            foreignKeys: [
                {
                    name: 'UserOrphanage',
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
        await queryRunner.dropTable('orphanages');
    }
}
exports.createOrphanages1602624281324 = createOrphanages1602624281324;
//# sourceMappingURL=1602624281324-create_orphanages.js.map