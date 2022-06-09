let fetch = require('node-fetch');
import IResponse from './IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class LoginController {
    public login(body:string): Promise<IResponse> | never {
        return fetch('https://mag_auth:8091/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
}
  