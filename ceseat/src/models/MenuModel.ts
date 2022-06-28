import ProductModel from "./ProductModel";

export default interface MenuModel {
    Menu : Array<ProductModel>;
    price : string;
    Vegan : boolean;
}

