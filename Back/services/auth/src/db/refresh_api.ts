const Client = require('pg');

export default function verify_pass(name: string,password: string): boolean{

    const connectionString = 'postgresql://user:Groupe1?!GG@postgres:5432/db';

    try{
        const client = new Client({connectionString});
        client.connect();
        
        let res = client.query('SELECT * FROM schema.api WHERE name=$1 AND password=$2 LIMIT 1;',[name, password]);
        client.end();
        
        return (res.rowCount === 0)?false:true;
    }catch(e){
        throw e;
    }
}