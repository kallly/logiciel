import { mongoConnect } from '../tools/mongo';
import { Order } from '../models/order';

export function get_order(): Promise<any> | never{
    return mongoConnect().then(() => {
        return Order.find().catch((e) => {throw e;})
    }).catch((e) => {throw e;})
}