
async function verify_pass(email: string,pass: string): Promise<false | { id: number; last_name:string; fisrt_name:string; address:string; phone_number:string; email: string; role: any; } | undefined>{
    const { Client } = require('pg');
    const argon2 = require('argon2');

    const connectionString = 'postgresql://user:Groupe1@127.0.0.1:5432/db'

    const client = new Client({connectionString})
    await client.connect()

    let res = await client.query('SELECT * FROM schema.user WHERE email=$1 LIMIT 1;',[email]);
    client.end();
    
    if(res.rowCount === 0){
        return false;
    }
    let hash = res.rows[0].password;
    let id = res.rows[0].id;
    let last_name = res.rows[0].last_name;
    let fisrt_name = res.rows[0].fisrt_name;
    let address = res.rows[0].address;
    let phone_number = res.rows[0].phone_number;
    let type = res.rows[0].type;
    
    let options = {type: argon2.argon2id,memoryCost: 15360, hashLength: 32};
    try {
        res = await argon2.verify(hash, pass, options);
        if (res === true) {
            return {id: id, last_name: last_name, fisrt_name: fisrt_name, address: address, phone_number: phone_number, email: email, role:type}
        } else {
            return false;
        }
    } 
    catch (e) {
        console.log(e);
    }

}

export default verify_pass;