import { mongoConnect } from '../tools/mongo';
import { IRestaurant, Restaurant } from '../models/restaurant';

export function get_restaurant(): Promise<any> | never{
    return mongoConnect().then(() => {
        return Restaurant.find().catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}