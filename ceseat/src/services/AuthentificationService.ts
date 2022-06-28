import Message from "@/models/Message";
import axios from "axios"

export default class AuthentificationService {
    async Authentification(email:string, password:string): Promise<boolean> {
        console.log(email, password)
        const json = JSON.stringify({email:email, password:password})
        const { data } = await axios.post<Message>(
            'https://ceseat.abconsult.ovh:8080/login/',
            json,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
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