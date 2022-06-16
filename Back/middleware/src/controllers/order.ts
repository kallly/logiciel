let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class OrderController {
    public getOrder(jwt:string): Promise<IResponse> | never {
        return fetch('https://mag_order:8094/order', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${jwt}`},
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }
    /*public getOrderBy(body:string): Promise<IResponse> | never {
        return fetch('https://mag_order:8094/order', {
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
    }*/
    public createOrder(jwt:string,body:string): Promise<IResponse> | never {
        return fetch('https://mag_order:8094/order/create', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${jwt}`},
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
    /*public updateOrder(jwt:string,id:string,body:string): Promise<IResponse> | never {
        return fetch(`https://mag_order:8094/order/update/${id}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${jwt}`},
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
    public deleteOrder(jwt:string,id:string): Promise<IResponse> | never {
        return fetch(`https://mag_order:8094/order/delete/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${jwt}`},
            agent: httpsAgent
        }).then((response:any): IResponse => {
            return response.json().then((json:any): IResponse => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(json)};
            })
            .catch((e:any) => {throw e;});
        })
        .catch((e:any) => {throw e;});
    }*/
}
  