const argon2 = require('argon2');
import { query as postgreQuery } from "../tools/postgres";

export async function update_token(id:number, token:any){

    if(token.access_token == null || token.refresh_token == null ){
        throw new Error('access_token or refresh_token missing');
    }
    let query = `UPDATE schema."user"
	SET access_token=$2, refresh_token=$3
	WHERE id=$1;`;
    let params = [id, token.access_token,token.refresh_token];
    
    await postgreQuery(query,params)
    .catch((e)=>{throw e;});
}