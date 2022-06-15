import { mongoConnect } from '../tools/mongo';
import { Product } from '../models/product';
import { IProduct } from '../models/product';

export function create_product(data:IProduct): Promise<any> | never{
    return mongoConnect().then(() => {
        const product = new Product({
            restaurant: data.restaurant,
            name: data.name,
            text: data.text,
            price: data.price,
        });
        return product.save().catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}