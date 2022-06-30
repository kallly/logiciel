export default interface RestaurantModel {
    _id?: string;
    Restaurant : string;
    img: string;
    name: string;
    description: string;
    Location : Array<string>;
    Type : string; //type de restaurant ( français /fast food ...)
    typeOfProduct : Array<string>; // pour permettre plusieurs compatiments
    //abx : Array<string>;
}

