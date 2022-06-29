let fetch = require('node-fetch');
import fetcher from '../tools/fetcher';
import IResponse from '../tools/IResponse';
  
export default class UserController {
    public getUser(requestId:string, jwt:string): Promise<IResponse> | never {
            let fetch = new fetcher('https://mag-user:8092/user', 'GET', requestId);
            fetch.jwt = jwt;
            return fetch.call();
    }

    public createUser(requestId:string, body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-user:8092/user/create', 'PUT', requestId);
        fetch.body = body;
        return fetch.call();
    }

    public updateUser(requestId:string, jwt:string, body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-user:8092/user/update', 'PUT', requestId);
        fetch.body = body;
        fetch.jwt = jwt;
        return fetch.call();
    }

    public deleteUser(requestId:string, jwt:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-user:8092/user', 'DELETE', requestId);
        fetch.jwt = jwt;
        return fetch.call();
    }
}
  