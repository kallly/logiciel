import RestaurantModel from "@/models/RestaurantModel";
//import axios from "axios"

export default class RestaurantService {
    getAllRestaurants(): Array<RestaurantModel> {
        let data : Array<RestaurantModel> = 
        [
            {
                ID : 1,
                Restaurant : "McDOnald01",
                name: "McDOnald",
                img: "test",
                description: "string",
                Location : ["Aix-en-provence", "13500"],
                Type : "fast food",
                typeOfProduct : ["menus", "plats", "boissons", "desserts"]
            },
            {
                ID : 2,
                Restaurant : "LaBrochette02",
                name: "LaBrochette",
                img: "test",
                description: "string",
                Location : ["Aix-en-provence", "13110"],
                Type : "viande",
                typeOfProduct : ["menus", "plats", "boissons"]
            },
            {
                ID : 3,
                Restaurant : "ChezMaman03",
                name: "ChezMaman",
                img: "test",
                description: "string",
                Location : ["Aix-en-provence", "13100"],
                Type : "Vegan",
                typeOfProduct : ["plats", "boissons"]
            },
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