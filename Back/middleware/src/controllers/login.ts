let fetch = require('node-fetch');
import fetcher from '../tools/fetcher';
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class LoginController {
    public login(requestId:string, body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag_auth:8091/user/login', 'POST', requestId);
        fetch.body = body;
        return fetch.call();
    }    
    public refresh(requestId:string, jwt:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag_auth:8091/user/refresh', 'GET', requestId);
        fetch.jwt = jwt;
        return fetch.call();
    }
}
  