


async function http_verif_user(jwt:string): Promise<boolean> | never {
    const https = require('https');

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    const fetch = require('node-fetch');
    const opts = {
        headers: {
            cookie: `jwt=${jwt}`
        },
        agent: httpsAgent
    };
    let response;
    try{
        response = await fetch('https://mag_user:8092/user/verif',opts);
        response = await response.json();
    }catch(e){
        throw e;
    }
    return (response==="Allow")?true:false;
}

export default http_verif_user;