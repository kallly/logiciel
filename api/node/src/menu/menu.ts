import { Schema, model } from 'mongoose';

interface IMenu {
    name: string;
    text: string;
}

const menuSchema = new Schema<IMenu>({
    name: { type: String, required: true },
    text: { type: String, required: true },
});

export const Menu = model<IMenu>('Menu', menuSchema);