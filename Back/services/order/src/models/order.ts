import { Schema, model, ObjectId } from 'mongoose';

export interface IOrder {
    _id?: ObjectId
    date?: Date;
    user: number;
    restaurant: ObjectId;
    products: Array<ObjectId>;
    price?: number;
    status?: string;
    prepared_date?: Date;
    delivered_date?: Date;
}

const orderSchema = new Schema<IOrder>({
    date: { type: Date, required: true },
    user: { type: Number, required: true },
    restaurant: { type: String, required: true },
    products: { type: [], required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    prepared_date: { type: Date, required: false },
    delivered_date: { type: Date, required: false },
});

export const Order = model<IOrder>('Order', orderSchema);