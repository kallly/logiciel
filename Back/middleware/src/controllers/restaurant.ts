let fetch = require('node-fetch');
import fetcher from '../tools/fetcher';
import IResponse from '../tools/IResponse';
  
export default class RestaurantController {
    public getRestaurant(requestId:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-restaurant:8095/restaurant', 'GET', requestId);
        return fetch.call();
    }
    public getRestaurantBy(requestId:string, body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-restaurant:8095/restaurant', 'POST', requestId);
        fetch.body = body;
        return fetch.call();
    }
    public createRestaurant(requestId:string, jwt:string,body:string): Promise<IResponse> | never {
        let fetch = new fetcher('https://mag-restaurant:8095/restaurant/create', 'PUT', requestId);
        fetch.jwt = jwt;
        fetch.body = body;
        return fetch.call();
    }
    public updateRestaurant(requestId:string, jwt:string,body:string): Promise<IResponse> | never {
        let fetch = new fetcher(`https://mag-restaurant:8095/restaurant/update`, 'PUT', requestId);
        fetch.jwt = jwt;
        fetch.body = body;
        return fetch.call();
    }
    public deleteRestaurant(requestId:string, jwt:string): Promise<IResponse> | never {
        let fetch = new fetcher(`https://mag-restaurant:8095/restaurant/delete`, 'DELETE', requestId);
        fetch.jwt = jwt;
        return fetch.call();
    }
}
  