import { mongoConnect } from '../tools/mongo';
import { Order, IOrder } from '../models/order';

export function update_order(data:IOrder): Promise<any> | never{
    return mongoConnect().then(() => {
        const order = new Order({
            _id: data._id,
            status: data.status
        });
        return Order.findOneAndUpdate({'_id': data._id},order,{upsert:false,new:true});
    }).catch((e) => {throw e;});
}