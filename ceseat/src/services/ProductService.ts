import ProductModel from "@/models/ProductModel";
//import axios from "axios"

export default class ProductService {
    getAllProducts(): Array<ProductModel> {
        let data : Array<ProductModel> = 
        [
            {
                ID : 1,
                Restaurant : "McDOnald01",
                name: "Courjette",
                img: "test",
                description: "string",
                price : 10,
                Vegan : false
            },
            {
                ID : 2,
                Restaurant : "McDOnald01",
                name: "burger",
                img: "test",
                description: "burger vegan  : ingrédients : pain, patates",
                price : 50,
                Vegan : true}
        ]
        
        /*const { data } = await axios.get<Array<Product>>(
            'http://localhost:3002/product',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );*/

        return data;
    }
}