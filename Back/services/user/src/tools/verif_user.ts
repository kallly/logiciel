import https from 'https'
const fetch = require('node-fetch');
import parseCookies from './parseCookies'
import { default_error } from '../tools/IResponse';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});


export default async function verif_user(req:any, res:any, next:any) {
    let cookies = parseCookies(req);
    const opts = {
    headers: {
            cookie: `jwt=${cookies['jwt']}`
        },
        agent: httpsAgent
    };
    let response;
    try{
        response = await fetch('https://mag_user:8092/user/verif',opts).then(async (r:any) => {
            return await r.json();
        });
    }catch(e){ default_error(res,new Error('verif_user'));return; }
    if(response!=="Allow"){
        console.log(response);
        res.send('Not Allow');
    }
    next();
};