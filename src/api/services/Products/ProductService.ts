import { Service } from 'typedi'
import { ProductRepository } from '../../repositories/Products/ProductRepository'
import { ProductNotFoundException } from '../../exceptions/Products/ProductNotFoundException'
import { EventDispatcher, EventDispatcherInterface } from '../../../decorators/EventDispatcher'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Service()
export class ProductService {
    constructor(
        @InjectRepository() private productRepository: ProductRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
        //
    }

    public async getAll(resourceOptions?: object) {
        return await this.productRepository.findAndCountRaw(resourceOptions)
    }

    public async findOneById(id: number, resourceOptions?: object) {
        return await this.getRequestedProductOrFail(id, resourceOptions)
    }

    public async create(data: any) {
        let product = await this.productRepository.save(this.productRepository.create(data))

        this.eventDispatcher.dispatch('onProductCreate', product)

        return product
    }

    public async updateOneById(id: number, data: any) {
        await this.productRepository.update(id, data)

        return await this.getRequestedProductOrFail(id)
    }

    public async deleteOneById(id: number) {
        return await this.productRepository.delete(id)
    }

    private async getRequestedProductOrFail(id: number, resourceOptions?: object) {
        let product = await this.productRepository.findOneByIdRaw(id, resourceOptions)

        if (!product) {
            throw new ProductNotFoundException
        }

        return product
    }
}