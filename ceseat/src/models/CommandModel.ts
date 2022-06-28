export default interface CommandModel {
    ID: number;
    Date : string; // a voir si modification
    Restaurant : string;
    RestaurantAdress : string;
    ClientID : number;
    ClientAdressDelivery : string;
    Command : Array<string>;
    Amount : number;
}