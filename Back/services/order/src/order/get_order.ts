import { mongoConnect } from '../tools/mongo';
import { Order } from './order';

export function get_order(): Promise<any> | never{
    return mongoConnect().then(async() => {
        return Order.find().catch((e) => {throw e;})
    }).catch((e) => {throw e;})
}