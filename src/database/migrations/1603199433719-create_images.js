"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImages1603199433719 = void 0;
const typeorm_1 = require("typeorm");
class createImages1603199433719 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'images',
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
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'orphanage_id',
                    type: 'uuid'
                }
            ],
            // agora vai nossas chaves estrageiras
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('images');
    }
}
exports.createImages1603199433719 = createImages1603199433719;
//# sourceMappingURL=1603199433719-create_images.js.map