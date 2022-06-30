import { mongoConnect } from '../tools/mongo';
import { IOrder, Order } from '../models/order';

export function get_order_by(order:IOrder): Promise<any> | never{
    return mongoConnect().then(() => {
        return Order.find(order).catch((e) => {throw e;})
    }).catch((e) => {throw e;})
}