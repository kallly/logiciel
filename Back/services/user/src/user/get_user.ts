import { query as postgreQuery } from "../tools/postgres";

export async function get_user(id:number): Promise<any> | never{
    let query = 'SELECT id, last_name, first_name, type FROM schema.user WHERE id=$1 LIMIT 1;';
    let params = [id];
    
    let query_res = await postgreQuery(query,params)
                    .catch((e)=>{throw e;});
    
    if(query_res.rowCount !== 1){
        throw new Error('User not find');
    }
    return query_res.rows[0];
}