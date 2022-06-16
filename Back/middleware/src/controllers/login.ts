let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class LoginController {
    public login(body:string): Promise<IResponse> | never {
        return fetch('https://mag_auth:8091/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:response.status,header:{'Content-Type': 'application/json'},message:json};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
}
  