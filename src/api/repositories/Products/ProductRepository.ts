import { EntityRepository } from 'typeorm'
import { RepositoryBase } from '../../../abstracts/RepositoryBase'
import { Product } from '../../models/Products/Product'

@EntityRepository(Product)
export class ProductRepository extends RepositoryBase<Product>  {
    // 
}