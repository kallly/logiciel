import IResponse from '../tools/IResponse';
import { User } from "../user/user";

export default class UserController {
    public getUser(id:number): Promise<IResponse> | never {
        return User.get_user(id).then((user) => {
            return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:"success",message:user})}; 
        }).catch((e) => {
            throw e;
        });
    }
    public verifUser(access_token:string): Promise<IResponse> | never {
        let diff = new Date(Date.now() - parseInt(access_token.split(':')[0]));
        if(diff.getUTCHours() > 0){
            try{
                Promise.reject('access_token expired'); 
            }catch(e){
                throw e;
            }
        }
        return User.verif_user(access_token).then((result) => {
            if(result){
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:"success",allow:true})}; 
            }
            else{
                return {code:200,header:{'Content-Type': 'application/json'},message:JSON.stringify({status:"success",allow:false})};
            }
        }).catch((e) => {
            throw e;
        })
    }
    public createUser(last_name: string, first_name: string, password: string, address: string, email: string, phone_number: string, type: string): Promise<IResponse> | never {
        let user = new User(null,last_name, first_name, password, address, email, phone_number, type);
        if(!user.full())
            throw new Error('Missing param');

        return user.create_user().then(()=>{
            return {code:200,header:{'Content-Type': 'text/plain'},message:JSON.stringify({status:'success'})};
        }).catch((e)=>{
            throw e;
        });
    }
    public updateUser(id: number,last_name: string, first_name: string, password: string, address: string, email: string, phone_number: string): Promise<IResponse> | never {
        let user = new User(id,last_name, first_name, password, address, email, phone_number);
        return user.update_user().then(()=>{
            return {code:200,header:{'Content-Type': 'text/plain'},message:JSON.stringify({status:'success'})};
        }).catch((e)=>{
            throw e;
        });
    }
    public deleteUser(id: number): Promise<IResponse> | never {
        return User.delete_user(id).then(()=>{
            return {code:200,header:{'Content-Type': 'text/plain'},message:JSON.stringify({status:'success'})};
        }).catch((e)=>{
            throw e;
        })
    }
}
  

