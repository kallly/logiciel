import { mongoConnect } from '../tools/mongo';
import { Restaurant } from '../models/restaurant';
import { IRestaurant } from '../models/restaurant';

export function create_restaurant(data:IRestaurant): Promise<any> | never{
    return mongoConnect().then(() => {
        const restaurant = new Restaurant({
            name:           data.name,
            img:            data.img,
            price:          data.price,
            description:    data.description,
            location:       data.location,
            type:           data.type,
            user:           data.user
        });
        return restaurant.save().catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}