const argon2 = require('argon2');
import { User } from "./user";
import { query as postgreQuery } from "../postgres";

export async function update_user(user:User){
    
    let hash;
    if(user.password!=undefined){
        let options = {type: argon2.argon2id,memoryCost: 15360, hashLength: 32};

        try {
            hash = await argon2.hash(user.password,options);
        } 
        catch (e) {
            console.log(e);
        }
    }

    let query = `UPDATE schema."user"
	SET last_name=COALESCE($2,last_name), first_name=COALESCE($3,first_name), password=COALESCE($4,password), address=COALESCE($5,address), email=COALESCE($6,email), phone_number=COALESCE($7,phone_number)
	WHERE id=$1;`;
    let params = [user.id, user.last_name||null, user.first_name||null, hash||null, user.address||null, user.email||null, user.phone_number||null];
    
    await postgreQuery(query,params)
    .catch((e)=>{throw e;});
}