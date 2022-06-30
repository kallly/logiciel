import Message from "@/models/Message";
import CommandModel from "@/models/CommandModel";
import axios from "axios"

export default class CommandService {
    async getAllOrder(RestaurantName : string): Promise<Array<CommandModel>> {
        
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
    async getProduct(id:string): Promise<CommandModel> {
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/order',
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