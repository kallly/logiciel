let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

export function get_product(): Promise<IResponse> | never {
    return fetch('https://mag_product:8093/product', {
        method: 'GET',
        credentials: 'same-origin',
        agent: httpsAgent
    }).then((response:any): IResponse => {
        return response.json().then((json:any): IResponse => {
            return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json.message)};
        })
        .catch((e:any) => {throw e;});
    })
    .catch((e:any) => {throw e;});
}