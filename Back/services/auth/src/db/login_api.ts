const Client = require('pg');

export default function verify_pass(name: string,password: string): Promise<boolean> | never{

    const connectionString = 'postgresql://user:'+encodeURIComponent('Groupe1!GG')+'@postgres:5432/db';

    const client = new Client({connectionString});
    return client.connect().then(() => {
        return client.query('SELECT * FROM schema.api WHERE name=$1 AND password=$2 LIMIT 1;',[name, password]).then((res: any) => {
            client.end();
            return (res.rowCount === 0)?false:true;
        }).catch((e:any) => {throw e;});
    }).catch((e:any) => {throw e;});
}