let fetch = require('node-fetch');
import fetcher from '../tools/fetcher';
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class OrderController {
    public getOrder(requestId:string, jwt:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-order:8094/order', 'GET', requestId);
        fetch.jwt = jwt;
        return fetch.call();
    }
    public getOrderBy(requestId:string, jwt:string, body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-order:8094/order', 'POST', requestId);
        fetch.jwt = jwt;
        fetch.body = body;
        return fetch.call();
    }
    public createOrder(requestId:string, jwt:string,body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-order:8094/order/create', 'PUT', requestId);
        fetch.jwt = jwt;
        fetch.body = body;
        return fetch.call();
    }
    public updateOrder(requestId:string, jwt:string,id:string,body:string): Promise<IResponse> | never {
        let fetch = new fetcher(`https://mag-order:8094/order/update/${id}`, 'PUT', requestId);
        fetch.jwt = jwt;
        fetch.body = body;
        return fetch.call();
    }
    public deleteOrder(requestId:string, jwt:string,id:string): Promise<IResponse> | never {
        let fetch = new fetcher(`https://mag-order:8094/order/${id}`, 'DELETE', requestId);
        fetch.jwt = jwt;
        return fetch.call();
    }
}
  