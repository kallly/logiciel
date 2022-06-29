import { Schema, model, ObjectId } from 'mongoose';

export interface IRestaurant {
    _id?:           ObjectId;
    name:           string;
    img:            string;
    description:    string;
    location:       string;
    type:           string;
    user:           number;
}

const restaurantSchema = new Schema<IRestaurant>({
    name:           { type: String, required: true },
    img:            { type: String, required: true },
    description:    { type: String, required: true },
    location:       { type: String, required: true },
    type:           { type: String, required: true },
    user:           { type: Number, required: true },
});

export const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);