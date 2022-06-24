import { mongoConnect } from '../tools/mongo';
import { Restaurant } from '../models/restaurant';
import { IRestaurant } from '../models/restaurant';

export function delete_restaurant(user_id:number): Promise<any> | never{
    return mongoConnect().then(() => {
        return Restaurant.deleteOne({'user': user_id});
    }).catch((e) => {throw e;});
}