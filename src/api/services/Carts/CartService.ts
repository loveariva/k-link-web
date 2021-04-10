import { Service } from 'typedi'
import { CartRepository } from '../../repositories/Carts/CartRepository'
import { CartNotFoundException } from '../../exceptions/Carts/CartNotFoundException'
import { EventDispatcher, EventDispatcherInterface } from '../../../decorators/EventDispatcher'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { RedisClient } from 'redis'
import { ProductRepository } from '../../repositories/Products/ProductRepository'

@Service()
export class CartService {
    private redisClient: RedisClient
    private cursor: string
    private redisKeys: any

    constructor(
        @InjectRepository() private cartRepository: CartRepository,
        @InjectRepository() private productRepository: ProductRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
        //
        this.redisClient = new RedisClient({    
            port: 6379, 
            host: '127.0.0.1'
        });
    }
    
    public async addItem(data: any) {
        return await this.redisClient.set(data.trans_no+' '+data.user_email+' '+data.product_name, JSON.stringify(data))
    }
    
    public async checkout(trans_no: string) {
        this.cursor = '0'
        this.redisKeys = 'keys ' + trans_no + ' => '

        await this.scan(trans_no+'*', ()=>{})

        return await this.redisKeys
    }
    
    private async scan(pattern: any, callback?: any){
        this.redisClient.scan(this.cursor, 'MATCH',pattern,'COUNT', '1000', (err, reply) =>{
          if(err){
              throw err;
          }
          console.info('reply[0] => ' + reply[0])
          console.info('reply[1] => ' + reply[1])

          let keys = reply[1];
            keys.forEach((key,i) => {     
                console.info('key: ' + key)
                this.redisClient.get(key, (err, value) => {
                    console.info('value: ' + value)   
                    let item = JSON.parse(value)
                    item.checkout = new Date().toISOString().slice(0, 19)
                    this.cartRepository.save(this.cartRepository.create(item))
                    this.redisClient.del(key)          
                })
            });

          this.cursor = reply[0];
          if(this.cursor === '0'){
              return callback();
          }else{    
              console.info('trans_no: ' + keys.toString())     
              keys.forEach((key,i) => {     
                console.info('trans_no: ' + key)              
                this.redisClient.del(key);
              });
              return this.scan(pattern,callback);
          }
        });
    }

    public async payment(trans_no: string) {
        this.cartRepository.query("SELECT * FROM carts WHERE trans_no=?", [trans_no]).then((items) => {
            console.info(items)
            for (let i=0; i<items.length; i++) {
                this.productRepository.query("UPDATE products SET stock_out = stock_out + ? WHERE product_name=?", [items[i].quantity, items[i].product_name])              
            }
        })
    }

    public async getAll(resourceOptions?: object) {
        return await this.cartRepository.findAndCountRaw(resourceOptions) 
    }

    public async findOneById(id: number, resourceOptions?: object) {
        return await this.getRequestedCartOrFail(id, resourceOptions)
    }

    public async create(data: any) {
        let cart = await this.cartRepository.save(this.cartRepository.create(data))

        this.eventDispatcher.dispatch('onCartCreate', cart)

        return cart
    }

    public async updateOneById(id: number, data: any) {
        await this.cartRepository.update(id, data)

        return await this.getRequestedCartOrFail(id)
    }

    public async deleteOneById(id: number) {
        return await this.cartRepository.delete(id)
    }

    private async getRequestedCartOrFail(id: number, resourceOptions?: object) {
        let cart = await this.cartRepository.findOneByIdRaw(id, resourceOptions)

        if (!cart) {
            throw new CartNotFoundException
        }

        return cart
    }
}