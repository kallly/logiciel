import IResponse from "../tools/IResponse";
import auth from '../other/auth';
import { update_jwt } from "../other/update_jwt";
import jwt_gen from '../other/jwt_gen';


export default class LoginController {
    public login(email:string, password:string): Promise<IResponse> | never {
        if(email == undefined || password == undefined){
            return Promise.reject(new Error('email or password is undefined'));
        }

        return auth(email,password).then(data => {
            if(!data)
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed','message':'email or password is wrong'})};

            let jwt = jwt_gen(data);

            return update_jwt(data.id,jwt).then(() => {
                console.log(jwt);
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',jwt:jwt})};
            }).catch((e) => {
                throw e;
            });   
        });
    }
}  
    