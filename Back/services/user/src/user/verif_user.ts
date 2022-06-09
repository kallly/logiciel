import { query as postgreQuery } from "../postgres";

export async function verif_user(jwt:string): Promise<boolean> | never{
    let query = 'SELECT id FROM schema.user WHERE jwt=$1 LIMIT 1;';
    let params = [jwt];
    
    let query_res = await postgreQuery(query,params)
                    .catch((e)=>{throw e;});

    if(query_res.rowCount !== 1){
        throw new Error('User not find');
    }
    else{
        return true;
    }
}