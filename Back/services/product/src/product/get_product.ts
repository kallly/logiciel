import { mongoConnect } from '../tools/mongo';
import { IProduct, Product } from '../models/product';

export function get_product(): Promise<any> | never{
    return mongoConnect().then(() => {
        return Product.find().catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}