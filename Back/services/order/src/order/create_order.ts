import { mongoConnect } from '../tools/mongo';
import { Order, IOrder } from '../models/order';

export function create_order(data:IOrder): Promise<any> | never{
    return mongoConnect().then(() => {

        const order = new Order({
            date: Date(),
            user: data.user,
            restaurant: data.restaurant,
            product: data.products,
            price: data.price,
            status: 'Order created'
        });
        return order.save().catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}