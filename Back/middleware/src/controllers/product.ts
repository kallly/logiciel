let fetch = require('node-fetch');
import fetcher from '../tools/fetcher';
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class ProductController {
    public getProduct(requestId:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag_product:8093/product', 'GET', requestId);
        return fetch.call();
    }
    public getProductBy(requestId:string, body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag_product:8093/product', 'POST', requestId);
        fetch.body = body;
        return fetch.call();
    }
    public createProduct(requestId:string, jwt:string,body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag_product:8093/product/create', 'PUT', requestId);
        fetch.jwt = jwt;
        fetch.body = body;
        return fetch.call();
    }
    public updateProduct(requestId:string, jwt:string,id:string,body:string): Promise<IResponse> | never {
        let fetch = new fetcher(`https://mag_product:8093/product/update/${id}`, 'PUT', requestId);
        fetch.jwt = jwt;
        fetch.body = body;
        return fetch.call();
    }
    public deleteProduct(requestId:string, jwt:string,id:string): Promise<IResponse> | never {
        let fetch = new fetcher(`https://mag_product:8093/product/delete/${id}`, 'DELETE', requestId);
        fetch.jwt = jwt;
        return fetch.call();
    }
}
  