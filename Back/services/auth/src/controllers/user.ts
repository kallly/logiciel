import IResponse from "../tools/IResponse";
import auth from '../other/auth';
import { update_token } from "../other/update_token";
import jwt_gen from '../other/jwt_gen';
import verif_refresh from "../other/verif_refresh";

export default class LoginController {
    public login(email:string, password:string): Promise<IResponse> | never {
        if(email == undefined || password == undefined){
            return Promise.reject(new Error('email or password is undefined'));
        }

        return auth(email,password).then(data => {
            if(!data){
                return {code:403,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed','message':'email or password is wrong'})};
            }

            let token:any = null;
            try{
                token = jwt_gen(data);
            }catch(e){
                return {code:500,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed','message':'internal error'})};
            }
            if(token === null){
                return {code:500,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed','message':'internal error'})};
            }
            
            return update_token(data.id,token).then(() => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',jwt:token.jwt})};
            }).catch((e) => {
                throw e;
            });   
        });
    }

    public refresh(email:string,refresh_token:string): Promise<IResponse> | never {
        let diff = new Date(Date.now() - parseInt(refresh_token.split(':')[0]));
        if(diff.getUTCHours() > 1){
            Promise.reject('refresh_token expired');
        }

        return verif_refresh(email,refresh_token).then(data => {
            if(!data){
                return {code:403,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed','message':'email or refresh_token is wrong'})};
            }

            let token:any = null;
            try{
                token = jwt_gen(data);
            }catch(e){
                return {code:500,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed','message':'internal error'})};
            }
            if(token === null){
                return {code:500,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'failed','message':'internal error'})};
            }
            
            return update_token(data.id,token).then(() => {
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:'success',jwt:token.jwt})};
            }).catch((e) => {
                throw e;
            });   
        });
    }
}  
    