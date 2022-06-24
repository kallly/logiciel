import { mongoConnect } from '../tools/mongo';
import { Order } from '../models/order';

export function get_statistics(restaurant_id:String): Promise<any> | never{
    return mongoConnect().then(() => {
        return Order.find({'restaurant':restaurant_id},{'_id':1,'restaurant':1, 'date':1, 'price':1, 'products':1}).catch((e) => {throw e;})
    }).catch((e) => {throw e;})
}