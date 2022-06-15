import { mongoConnect } from '../tools/mongo';
import { Product } from '../models/product';
import { IProduct } from '../models/product';

export function delete_product(id:string): Promise<any> | never{
    return mongoConnect().then(() => {
        return Product.deleteOne({'_id': id});
    }).catch((e) => {throw e;});
}