import { Schema, model } from 'mongoose';

interface IOrder {
    id: Number;
    date: Date;
    restaurant: string;
    menu: string;
}

const orderSchema = new Schema<IOrder>({
    id: { type: Number, required: true },
    date: { type: Date, required: true },
    restaurant: { type: String, required: true },
    menu: { type: String, required: true },
});

export const Order = model<IOrder>('Order', orderSchema);