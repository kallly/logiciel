let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class MenuController {
    public getMenu(jwt:string): Promise<IResponse> | never {
        return fetch('https://mag_menu:8093/menu', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json','cookie': `jwt=${jwt}`},
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
  