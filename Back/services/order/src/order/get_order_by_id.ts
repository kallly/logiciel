import { mongoConnect } from '../tools/mongo';
import { Order } from '../models/order';

export function get_order_by_id(id:number): Promise<any> | never{
    return mongoConnect().then(() => {
        return Order.findById(id).catch((e) => {throw e;})
    }).catch((e) => {throw e;})
}