import Message from "@/models/Message";
import CommandModel from "@/models/CommandModel";
import axios from "axios"

export default class CommandService {
    async getClientOrder(userId : number): Promise<Array<CommandModel>> {
        
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/order',
            {user : userId},
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
       console.log('getClientOrder',data)
        return data.message;

    }
    async getRestaurantOrder(RestaurantID : string): Promise<Array<CommandModel>> {
        
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/order',
            {restaurant : RestaurantID},
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
       console.log('getRestaurantOrder',data)
        return data.message;

    }
    async getAllOrder(): Promise<Array<CommandModel>> {
        
        const { data } = await axios.get<Message>(
            'https://ceseat.abconsult.ovh:8080/order',
            
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
       console.log(data)
        return data.message;

    }
    async update(order:any): Promise<string> {
        const { data } = await axios.put<Message>(
            'https://ceseat.abconsult.ovh:8080/order/update',
            order,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log('update',data)
        return data.status;
    }
}