import { mongoConnect } from '../tools/mongo';
import { Order } from '../models/order';

export function delete_order_by_id(id:string): Promise<any> | never{
    return mongoConnect().then(() => {
        return Order.deleteOne({'_id':id}).catch((e) => {throw e;})
    }).catch((e) => {throw e;})
}