import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCartsTable1617951080738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'carts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'trans_date',
                    type: 'datetime',
                    length: '6'
                },
                {
                    name: 'trans_no',
                    type: 'varchar',
                    length: '191'
                },
                {
                    name: 'user_email',
                    type: 'varchar',
                    length: '191'
                },
                {
                    name: 'product_name',
                    type: 'varchar',
                    length: '191'
                },
                {
                    name: 'price',
                    type: 'numeric',
                    length: '65'
                },
                {
                    name: 'quantity',
                    type: 'numeric',
                    length: '65'
                },
                {
                    name: 'checkout',
                    type: 'datetime',
                    length: '6'
                }
            ]
        })
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('carts');
    }

}
