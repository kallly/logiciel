const Client = require('pg-ts');

export default function verify_pass(name:string, refresh_token:string): Promise<any> | never{

    const connectionString = 'postgresql://user:Groupe1@postgres:5432/db';

    const client = new Client({connectionString});
    return client.connect().then(() => {
        return client.query('UPDATE FROM schema.api SET refresh=$2 WHERE name=$1;',[name,refresh_token]).then((res:any) => {
            client.end();
            return res;
        }).catch((e:any) => {throw e;});
    }).catch((e:any) => {throw e;});
}