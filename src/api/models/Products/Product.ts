import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityBase } from '../../../abstracts/EntityBase'

@Entity({ name: 'products' })
export class Product extends EntityBase {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    product_name: string

    @Column()
    price: number

    @Column()
    stock_in: number

    @Column()
    stock_out: number
}