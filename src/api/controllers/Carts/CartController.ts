import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers'
import { CartService } from '../../services/Carts/CartService'
import { Service } from 'typedi'
import { CartCreateRequest } from '../../requests/Carts/CartCreateRequest'
import { AuthCheck } from '../../middlewares/Auth/AuthCheck'
import { ResourceOptions } from '../../transformers/Application/ResourceOptions'
import { ControllerBase } from '../../../abstracts/ControllerBase'

@Service()
@JsonController('/carts')
@UseBefore(AuthCheck)
export class CartController extends ControllerBase {
    public constructor(
        private cartService: CartService
    ) {
        super()
    }

    @Post('/add-item')
    @HttpCode(201)
    public async addItem(@Body() cart: CartCreateRequest) {
        return await this.cartService.addItem(cart)
    }

    @Post('/checkout/:trans_no')
    @HttpCode(201)
    public async checkout(@Param('trans_no') trans_no: string) {
        console.info('trans_no: ' + trans_no)
        return await this.cartService.checkout(trans_no)
    }

    @Post('/payment/:trans_no')
    @HttpCode(201)
    public async payment(@Param('trans_no') trans_no: string) {
        return await this.cartService.payment(trans_no)
    }

    @Get()
    public async getAll(@QueryParams() resourceOptions: ResourceOptions) {
        return await this.cartService.getAll(resourceOptions.getAll())
    }

    @Get('/:id')
    public async getOne(@Param('id') id: number, @QueryParams() resourceOptions: ResourceOptions) {
        return await this.cartService.findOneById(id, resourceOptions.getAll())
    }

    @Post()
    @HttpCode(201)
    public async create(@Body() cart: CartCreateRequest) {
        return await this.cartService.create(cart)
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() cart: any) {
        return await this.cartService.updateOneById(id, cart)
    }

    @Delete('/:id')
    @HttpCode(204)
    public async delete(@Param('id') id: number) {
        return await this.cartService.deleteOneById(id)
    }
}