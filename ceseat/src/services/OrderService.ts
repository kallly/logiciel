import Message from "@/models/Message";
import axios from "axios"
import Order from "@/models/CommandModel";
export default class OrderService {
    async sendOrder(Order:Order): Promise<boolean> {
        console.log(Order)
        const { data } = await axios.put(
            'https://ceseat.abconsult.ovh:8080/order/create',
            Order,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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
}