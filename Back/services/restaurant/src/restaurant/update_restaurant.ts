import { mongoConnect } from '../tools/mongo';
import { Restaurant } from '../models/restaurant';
import { IRestaurant } from '../models/restaurant';

export function update_restaurant(user_id:number,data:IRestaurant): Promise<any> | never{
    return mongoConnect().then(() => {
       return Restaurant.findOne({user: user_id}).then((obj) => {
            if(obj == null){
                throw new Error('Restaurant not find');
            }
            let id = obj._id;
            const restaurant = new Restaurant({
                _id:            id,
                img:            data.img,
                description:    data.description,
                location:       data.location,
                type:           data.type
            });console.log('flag');
            return Restaurant.findOneAndUpdate({'_id':id,'user': user_id},restaurant,{upsert:false,new:true})
        });
    }).catch((e) => {throw e;});
}