import IResponse from "../tools/IResponse";
import auth from '../other/auth';
import { update_jwt } from "../other/update_jwt";
import jwt_gen from '../other/jwt_gen';


export default class LoginController {
    public login(email:string, password:string): Promise<IResponse> | never {
        if(email == undefined || password == undefined)
            throw new Error('Missing Params');
            //return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify('Missing params')};

        return auth(email,password).then(data => {
            if(!data)
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify('Failed')};

            let jwt = jwt_gen(data);

            return update_jwt(data.id,jwt).then(() => {
                console.log(jwt);
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify(jwt)};
            }).catch((e) => {
                throw e;
            });   
        });
    }
}  
    