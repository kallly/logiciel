const { Client } = require('pg');

export async function query(query:string,params:Array<any>): Promise<any> | never{
    const connectionString = 'postgresql://user:'+encodeURIComponent('Groupe1!GG')+'@postgres:5432/db';

    const client = new Client({connectionString});
    await client.connect();

    let query_res = await client.query(query,params)
                    .catch((e:any) => {client.end();throw e;});
    client.end();
    return query_res;
}