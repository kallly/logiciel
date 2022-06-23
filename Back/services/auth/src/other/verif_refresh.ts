const { Client } = require('pg');
const argon2 = require('argon2');

export default async function verif_refresh(email:string,refresh_token:string): Promise<false | { id: number; last_name:string; first_name:string; address:string; phone_number:string; email: string; role: any; } | undefined>{


    const connectionString = 'postgresql://user:Groupe1@postgres:5432/db'

    const client = new Client({connectionString})
    await client.connect()

    let res = await client.query('SELECT id, last_name, first_name, address, phone_number, email, type FROM schema.user WHERE email=$1 AND refresh_token=$2 LIMIT 1;',[email,refresh_token]);
    client.end();
    
    if(res.rowCount === 0){
        return false;
    }
    let id = res.rows[0].id;
    let last_name = res.rows[0].last_name;
    let first_name = res.rows[0].first_name;
    let address = res.rows[0].address;
    let phone_number = res.rows[0].phone_number;
    let type = res.rows[0].type;

    return {id: id, last_name: last_name, first_name: first_name, address: address, phone_number: phone_number, email: email, role:type}
}