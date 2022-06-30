import Message from "@/models/Message";
import Statistic from "@/models/Statistic";
import Utilisateur from "@/models/Utilisateur";
import axios from "axios"

export default class UserService {
    async getUser(): Promise<Utilisateur> {
        const { data } = await axios.get<Message>(
            'https://ceseat.abconsult.ovh:8080/user/',
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
    async editUser(User : Utilisateur): Promise<boolean> {
        const { data } = await axios.put<Message>(
            'https://ceseat.abconsult.ovh:8080/user/update',User,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log(data)
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }
    async deleteUser(): Promise<boolean> {
        const { data } = await axios.delete<Message>(
            'https://ceseat.abconsult.ovh:8080/user',
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log(data)
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }
    async registerUser(User : Utilisateur): Promise<boolean> {
        const { data } = await axios.put<Message>(
            'https://ceseat.abconsult.ovh:8080/user/create',User,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.jwt}`
                },
            },
        );
        console.log(data)
        if (data.status == "success"){
            return true
        }else {
            return false
        }
    }
}