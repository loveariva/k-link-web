import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers'
import { ProductService } from '../../services/Products/ProductService'
import { Service } from 'typedi'
import { ProductCreateRequest } from '../../requests/Products/ProductCreateRequest'
import { AuthCheck } from '../../middlewares/Auth/AuthCheck'
import { ResourceOptions } from '../../transformers/Application/ResourceOptions'
import { ControllerBase } from '../../../abstracts/ControllerBase'

@Service()
@JsonController('/products')
@UseBefore(AuthCheck)
export class ProductController extends ControllerBase {
    public constructor(
        private productService: ProductService
    ) {
        super()
    }

    @Get()
    public async getAll(@QueryParams() resourceOptions: ResourceOptions) {
        return await this.productService.getAll(resourceOptions.getAll())
    }

    @Get('/:id')
    public async getOne(@Param('id') id: number, @QueryParams() resourceOptions: ResourceOptions) {
        return await this.productService.findOneById(id, resourceOptions.getAll())
    }

    @Post()
    @HttpCode(201)
    public async create(@Body() product: ProductCreateRequest) {
        return await this.productService.create(product)
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() product: any) {
        return await this.productService.updateOneById(id, product)
    }

    @Delete('/:id')
    @HttpCode(204)
    public async delete(@Param('id') id: number) {
        return await this.productService.deleteOneById(id)
    }
}