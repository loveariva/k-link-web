import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityBase } from '../../../abstracts/EntityBase'

@Entity({ name: 'carts' })
export class Cart extends EntityBase {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    trans_date: string

    @Column()
    trans_no: string

    @Column()
    user_email: string

    @Column()
    product_name: string

    @Column()
    price: number

    @Column()
    quantity: number

    @Column()
    checkout: string
}