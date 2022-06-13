import IResponse from "../tools/IResponse";
import auth from '../db/login_api';
import jwt_gen from '../other/jwt_gen';
import IApi from "../models/api";
import set_refresh_api from '../db/set_refresh_api';
import crypto from 'crypto';
import IJwt_api from '../models/jwt_api';

export default class LoginController {
    public login(body: IApi): Promise<IResponse> | never {
        if(body.name == undefined || body.password == undefined){
            return Promise.reject(new Error('email or password is undefined'));
        }

        return auth(body.name,body.password).then(connected => {
            if(!connected)
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed'})};
            return this.update_jwt(body.name);
        });
    }
    public refresh(jwt:IJwt_api): Promise<IResponse> | never {
        if(jwt == undefined){
            return Promise.reject(new Error('JWT is undefined'));
        }
        return this.update_jwt(jwt.name);
    }

    private update_jwt(name:string): Promise<IResponse> | never {
        let refresh_token = crypto.randomBytes(128).toString('hex');

        set_refresh_api(name, refresh_token);

        return jwt_gen({name:name,refresh_token:refresh_token});
    }
}  
    