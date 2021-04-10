import { EntityRepository } from 'typeorm'
import { RepositoryBase } from '../../../abstracts/RepositoryBase'
import { Cart } from '../../models/Carts/Cart'

@EntityRepository(Cart)
export class CartRepository extends RepositoryBase<Cart>  {
    // 
}