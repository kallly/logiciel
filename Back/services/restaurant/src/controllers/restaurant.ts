let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
import { mongoConnect } from '../tools/mongo';
import { get_restaurant } from '../restaurant/get_restaurant';
import { create_restaurant } from '../restaurant/create_restaurant';
import { update_restaurant } from '../restaurant/update_restaurant';
import { delete_restaurant } from '../restaurant/delete_restaurant';
import { IRestaurant } from '../models/restaurant';
import { get_restaurant_by } from '../restaurant/get_restaurant_by';
  
export default class RestaurantController {
    public getRestaurant(): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return get_restaurant().then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',message:result})};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public getRestaurantBy(restaurant:IRestaurant): Promise<IResponse> | never {
        return mongoConnect().then(async() => {
            return get_restaurant_by(restaurant).then((result) => {
                if(result != null){
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',message:result})};
                }else{
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed'})};
                }
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public createRestaurant(user_id:number, restaurant:IRestaurant): Promise<IResponse> | never {
        restaurant.user = user_id;
        return mongoConnect().then(() => {
            return create_restaurant(restaurant).then((result) => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success'})};
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public updateRestaurant(user_id:number, restaurant:IRestaurant): Promise<IResponse> | never {
        return mongoConnect().then(() => {
            return update_restaurant(user_id,restaurant).then((result) => {
                if(result != null){
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success'})};
                }else{
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed'})};
                }
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
    public deleteRestaurant(user_id:number): Promise<IResponse> | never {
        return mongoConnect().then(() => {
            return delete_restaurant(user_id).then((result) => {
                if(result.deletedCount !== 0){
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success'})};
                }else{
                    return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed'})};
                }
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }
}
  