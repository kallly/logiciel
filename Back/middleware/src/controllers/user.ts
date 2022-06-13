let fetch = require('node-fetch');
import IResponse from '../tools/IResponse';
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
  
export default class UserController {
    public getUser(jwt:string): Promise<IResponse> | never {
        return fetch('https://mag_user:8092/user', {
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

    public createUser(jwt:string, body:string): Promise<IResponse> | never {
        return fetch('https://mag_user:8092/user/create', {
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

    public updateUser(jwt:string, body:string): Promise<IResponse> | never {
        return fetch('https://mag_user:8092/user/update', {
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

    public deleteUser(jwt:string): Promise<IResponse> | never {
        return fetch('https://mag_user:8092/user', {
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
  