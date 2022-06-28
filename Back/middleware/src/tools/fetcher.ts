let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

export default class fetcher{

    private url:string;
    private method:string;
    private requestId:string;

    public body?:string;
    public jwt?:string;

    constructor(url:string, method:string, requestId:string){
        this.url = url;
        this.method = method;
        this.requestId = requestId;
    }

    call(): Promise<IResponse> | never{
        
        if(this.url == ''  && this.requestId == ''){
            Promise.reject('url and requestId are required');
        }

        let params:any = {
            headers: {'X-Request-ID': this.requestId},
            method: this.method,
            agent: httpsAgent
        }


        if(this.body != undefined){
            params.body = JSON.stringify(this.body);
            params.headers['Content-Type'] = 'application/json';
        }
        if(this.jwt != undefined){
            params.credentials = 'same-origin';
            params.headers['Authorization'] = `Bearer ${this.jwt}`;
        }     

        return fetch(this.url, params).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:response.status,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
}