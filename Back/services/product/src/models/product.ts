import { Schema, model, ObjectId } from 'mongoose';

export interface IProduct {
    _id?:       ObjectId;
    restaurant: string;
    name:       string;
    img:       string;
    text:       string;
    price:      number;
}

const productSchema = new Schema<IProduct>({
    restaurant: { type: String, required: true },
    name:       { type: String, required: true },
    img:        { type: String, required: true },
    text:       { type: String, required: true },
    price:      { type: Number, required: true },
});

export const Product = model<IProduct>('Product', productSchema);