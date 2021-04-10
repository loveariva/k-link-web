import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductsTable1617951068858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
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
                    name: 'stock_in',
                    type: 'numeric',
                    length: '65'
                },
                {
                    name: 'stock_out',
                    type: 'numeric',
                    length: '65'
                }
            ]
        })
        await queryRunner.createTable(table);

        await queryRunner.query(`INSERT INTO products (product_name, price, stock_in, stock_out) VALUES ('PROPOLIS',100000,100,0)`);
        await queryRunner.query(`INSERT INTO products (product_name, price, stock_in, stock_out) VALUES ('MADU',150000,100,0)`);
        await queryRunner.query(`INSERT INTO products (product_name, price, stock_in, stock_out) VALUES ('ZAITUN',50000,100,0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('products');
    }

}
