import { mongoConnect } from '../tools/mongo';
import { Product } from '../models/product';
import { IProduct } from '../models/product';

export function update_product(id:string,data:IProduct): Promise<any> | never{
    return mongoConnect().then(() => {
        const product = new Product({
            _id: id,
            restaurant: data.restaurant,
            name: data.name,
            img: data.img,
            text: data.text,
        });
        return Product.findOneAndUpdate({'_id': id},product,{upsert:false,new:true});
    }).catch((e) => {throw e;});
}