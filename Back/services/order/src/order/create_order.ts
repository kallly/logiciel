import { mongoConnect } from '../tools/mongo';
import { Order } from './order';

export function create_order(): Promise<any> | never{
    return mongoConnect().then(() => {

        const order = new Order({
            id: 1,
            date: Date(),
            restaurant: "test",
            menu: "test"
        });
        return order.save().catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}