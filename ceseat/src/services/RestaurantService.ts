import Message from "@/models/Message";
import RestaurantModel from "@/models/RestaurantModel";
import Restaurant from "@/models/Restaurant";
//import axios from "axios"
import axios from "axios";

export default class RestaurantService {
    async getAllRestaurants(): Promise<Array<Restaurant>> {
        const { data } = await axios.get<Message>(
            'https://ceseat.abconsult.ovh:8080/restaurant',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log(data);
        return data.message;
    }
    async getRestaurants(): Promise<Array<Restaurant>> {
        const { data } = await axios.get<Message>(
            'https://ceseat.abconsult.ovh:8080/restaurant',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log(data);
        return data.message;
    } async getRestaurantById(id:string): Promise<Restaurant> {
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/restaurant',
            {_id: id}
            ,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log('getRestaurantById',data);
        return data.message;
    }
    async getRestaurant(): Promise<Restaurant> {
        let decoded = JSON.parse(atob(localStorage.jwt.split('.')[1]));
        console.log(decoded.id)
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/restaurant',
            {user: decoded.id}
            ,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log('getRestaurant',data);
        return data.message;
    }
    async createRestaurant(restaurant : Restaurant): Promise<boolean> {
        console.log(restaurant)
        const { data } = await axios.put<Message>(
            'https://ceseat.abconsult.ovh:8080/restaurant/create',
            restaurant,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log(data);
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }
    async editRestaurant(restaurant : Restaurant): Promise<boolean> {
        console.log(restaurant)
        
        const { data } = await axios.put<Message>(
            'https://ceseat.abconsult.ovh:8080/restaurant/update',
            restaurant,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log(data);
        
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }
    async deleteRestaurant(): Promise<boolean> {
        const { data } = await axios.delete<Message>(
            'https://ceseat.abconsult.ovh:8080/restaurant',
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }
}