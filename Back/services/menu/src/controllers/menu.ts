let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
import { mongoConnect } from '../tools/mongo';
import { get_menu } from '../menu/get_menu';
import { create_menu } from '../menu/create_menu';
  
export default class MenuController {
    public getMenu(): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return get_menu().then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(result)};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public createMenu(): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return create_menu().then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(result)};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
}
  