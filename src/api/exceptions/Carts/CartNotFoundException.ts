import { NotFoundError } from 'routing-controllers'

export class CartNotFoundException extends NotFoundError {
    constructor() {
        super('Cart not found!')
    }
}