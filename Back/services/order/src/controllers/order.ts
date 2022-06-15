let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
import { mongoConnect } from '../tools/mongo';
import { get_order } from '../order/get_order';
import { create_order } from '../order/create_order';
import { get_product } from '../product/get_product';
import { IOrder } from '../models/order';
import { IProduct } from '../../../../models/product';
  
export default class OrderController {
    public getOrder(): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return get_order().then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',message:result})};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public createOrder(order:IOrder): Promise<IResponse> | never {
        return get_product().then((result) => {
            if(result.code !== 200){
                throw new Error('Product service not working');
            }
            let price: number = 0;
            try{
                JSON.parse(result.message).forEach((product:IProduct) => {
                    if(product._id != undefined && order.products != undefined)
                        if(order.products.includes(product._id))
                            price += product.price;
                });
            }catch(e){throw e;}
            order.price = price;

            return mongoConnect().then(() => {
                return create_order(order).then((result) => {
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',message:result})};
                }).catch((e) => {throw e;})
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;});
    }
}
  