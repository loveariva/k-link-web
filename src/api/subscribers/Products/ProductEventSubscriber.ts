import { EventSubscriber, On } from 'event-dispatch'

@EventSubscriber()
export class ProductEventSubscriber {

    @On('onProductCreate')
    onUserCreate(product: any) {
        console.log('Product created!')
    }
}