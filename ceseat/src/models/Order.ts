export default interface Order {
    _id?: string;
    date?: Date;
    user: number;
    restaurant: string;
    products: Array<string>;
    price?: number;
    status?: string;
    address?: string;
    prepared_date?: Date;
    delivered_date?: Date;
}