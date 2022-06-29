const argon2 = require('argon2');
import { User } from "./user";
import { query as postgreQuery } from "../tools/postgres";

export async function create_user(user:User){
    
    let options = {type: argon2.argon2id,memoryCost: 15360, hashLength: 32};

    let hash = await argon2.hash(user.password,options)
                .catch((e:any)=>{throw e;});

    let query:string = `INSERT INTO schema."user"(
        last_name, first_name, password, address, email, phone_number, type)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    let params = [user.last_name, user.first_name, hash, user.address, user.email, user.phone_number, user.type];
    
    await postgreQuery(query,params)
    .catch((e)=>{throw e;});
}