import Message from "@/models/Message";
import Statistic from "@/models/Statistic";
import axios from "axios"

export default class StatisticsService {
    async getStatistics(): Promise<Array<Statistic>> {
        const { data } = await axios.get<Message>(
            'https://ceseat.abconsult.ovh:8080/order/restaurant/629e33b5ce218b10d2d7a257',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        return data.message;
    }
}