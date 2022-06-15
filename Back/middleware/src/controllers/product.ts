let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class ProductController {
    public getProduct(): Promise<IResponse> | never {
        return fetch('https://mag_product:8093/product', {
            method: 'GET',
            credentials: 'same-origin',
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
    public getProductBy(body:string): Promise<IResponse> | never {
        return fetch('https://mag_product:8093/product', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(body),
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
    public createProduct(jwt:string,body:string): Promise<IResponse> | never {
        return fetch('https://mag_product:8093/product/create', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json','cookie': `jwt=${jwt}`},
            body : JSON.stringify(body),
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
    public updateProduct(jwt:string,id:string,body:string): Promise<IResponse> | never {
        return fetch(`https://mag_product:8093/product/update/${id}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json','cookie': `jwt=${jwt}`},
            body : JSON.stringify(body),
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
    public deleteProduct(jwt:string,id:string): Promise<IResponse> | never {
        return fetch(`https://mag_product:8093/product/delete/${id}`, {
            method: 'DELETE',
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
  