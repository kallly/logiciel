import Message from "@/models/Message";
import ProductModel from "@/models/ProductModel";
import axios from "axios"

export default class ProductService {
    getAllProducts(): Array<ProductModel> {
        let data : Array<ProductModel> = 
        [
            {
                ID : 1,
                Restaurant : "McDOnald01",
                name: "Salade de courjettes",
                img: "test",
                description: "ingrédients : courjette, sauce soja, sel, ...",
                price : 10,
                Vegan : true
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
    async getProduct(id:string): Promise<ProductModel> {
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/product',
            { _id: id},
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log('getProduct',data)
        return data.message[0];
    }
}