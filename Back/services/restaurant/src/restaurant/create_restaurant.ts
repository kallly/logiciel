import { mongoConnect } from '../tools/mongo';
import { Restaurant } from '../models/restaurant';
import { IRestaurant } from '../models/restaurant';

export function create_restaurant(data:IRestaurant): Promise<any> | never{
    return mongoConnect().then(() => {
        return Restaurant.find({'user':data.user}).then((trest) => {
            if(trest.length == 0){
                const restaurant = new Restaurant({
                    name:           data.name,
                    img:            data.img,
                    description:    data.description,
                    location:       data.location,
                    type:           data.type,
                    user:           data.user
                });
                return restaurant.save().catch((e) => {throw e;});
            }
            else{
                throw new Error('The user already has a restaurant');
            }
        }).catch((e) => {throw e;});

       
    }).catch((e) => {throw e;});
}