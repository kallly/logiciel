import Message from "@/models/Message";
import Statistic from "@/models/Statistic";
import axios from "axios"

export default class StatisticsService {
    async getStatistics(id: string): Promise<Array<Statistic>> {
        const { data } = await axios.get<Message>(
            `https://ceseat.abconsult.ovh:8080/order/restaurant/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        console.log('getStatistics',data.message)
        return data.message;
    }
}