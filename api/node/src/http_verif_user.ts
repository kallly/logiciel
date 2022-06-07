


async function http_verif_user(jwt:string): Promise<boolean> | never {
    const fetch = require('node-fetch');
    const opts = {
        headers: {
            cookie: `jwt=${jwt}`
        }
    };
    let response;
    try{
        response = await fetch('http://127.0.0.1:8092/user/verif',opts);
        response = await response.json();
    }catch(e){
        throw e;
    }
    return (response==="Allow")?true:false;
}

export default http_verif_user;