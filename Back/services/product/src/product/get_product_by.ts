import { mongoConnect } from '../tools/mongo';
import { IProduct, Product } from '../models/product';

export function get_product_by(product:IProduct): Promise<any> | never{
    return mongoConnect().then(() => {
        return Product.findOne(product).catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}