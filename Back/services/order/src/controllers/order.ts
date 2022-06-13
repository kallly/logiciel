let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
import { mongoConnect } from '../tools/mongo';
import { get_order } from '../order/get_order';
import { create_order } from '../order/create_order';
  
export default class OrderController {
    public getMenu(): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return get_order().then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(result)};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public createMenu(): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return create_order().then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(result)};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
}
  