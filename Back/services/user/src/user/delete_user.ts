import { query as postgreQuery } from "../postgres";

export async function delete_user(id:number){
    
    let query = 'DELETE FROM schema.user WHERE id=$1;';
    let params = [id];
    
    await postgreQuery(query,params)
    .catch((e)=>{throw e;});
}