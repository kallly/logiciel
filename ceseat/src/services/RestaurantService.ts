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
                description: "Est un fast-food hmmm c'est bon",
                Location : ["Aix-en-provence", "13500"],
                Type : "fast food",
                typeOfProduct : ["menus", "plats", "boissons", "desserts"]
            },
            {
                ID : 2,
                Restaurant : "LaBrochette02",
                name: "LaBrochette",
                img: "test",
                description: "Restaurant de brochettes, vous y trouverez toutes sortes de brochettes, cuites au four, au BBQ, au grill... faites vous plaisir",
                Location : ["Aix-en-provence", "13110"],
                Type : "viande",
                typeOfProduct : ["menus", "plats", "boissons"]
            },
            {
                ID : 3,
                Restaurant : "ChezMaman03",
                name: "ChezMaman",
                img: "test",
                description: "La cuisine nostalgique de maman, les cuisines de mamans ca nous connais, vous voulez retrouver le gout nostalgique de vôtre enfance, vous êtes au bon endroit",
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