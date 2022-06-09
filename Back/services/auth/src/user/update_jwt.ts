const argon2 = require('argon2');
import { query as postgreQuery } from "../postgres";

export async function update_jwt(id:number, jwt:string){

    let query = `UPDATE schema."user"
	SET jwt=COALESCE($2,jwt)
	WHERE id=$1;`;
    let params = [id, jwt||null];
    
    await postgreQuery(query,params)
    .catch((e)=>{throw e;});
}