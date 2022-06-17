let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
import { mongoConnect } from '../tools/mongo';
import { get_product } from '../product/get_product';
import { create_product } from '../product/create_product';
import { update_product } from '../product/update_product';
import { delete_product } from '../product/delete_product';
import { IProduct } from '../models/product';
import { get_product_by } from '../product/get_product_by';
  
export default class ProductController {
    public getProduct(): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return get_product().then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',message:result})};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public getProductBy(product:IProduct): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return get_product_by(product).then((result) => {
                if(result != null){
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',message:result})};
                }else{
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed'})};
                }
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public createProduct(product:IProduct): Promise<IResponse> | never {
        return mongoConnect().then(() => {
            return create_product(product).then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success'})};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public updateProduct(id:string, product:IProduct): Promise<IResponse> | never {
        return mongoConnect().then(() => {
            return update_product(id,product).then((result) => {
                if(result != null){
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success'})};
                }else{
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed'})};
                }
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public deleteProduct(id:string): Promise<IResponse> | never {
        return mongoConnect().then(() => {
            return delete_product(id).then((result) => {
                if(result.deletedCount !== 0){
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success'})};
                }else{
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed'})};
                }
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
}
  