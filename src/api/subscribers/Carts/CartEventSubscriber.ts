import { EventSubscriber, On } from 'event-dispatch'

@EventSubscriber()
export class CartEventSubscriber {

    @On('onCartCreate')
    onUserCreate(cart: any) {
        console.log('Cart created!')
    }
}