import { mongoConnect } from '../tools/mongo';
import { IRestaurant, Restaurant } from '../models/restaurant';

export function get_restaurant_by(restaurant:IRestaurant): Promise<any> | never{
    return mongoConnect().then(() => {
        return Restaurant.findOne(restaurant).catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}