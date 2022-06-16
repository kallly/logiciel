import https from 'https'
const fetch = require('node-fetch');
import parseCookies from './parseCookies'
import { default_error } from '../tools/IResponse';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});


export default async function verif_user(req:any, res:any, next:any) {
    let jwt = req.headers.authorization.split(' ')[1];
    const opts = {
    headers: {
        authorization: `Bearer ${jwt}`
        },
        agent: httpsAgent
    };
    let response;
    try{
        response = await fetch('https://mag_user:8092/user/verif',opts).then(async (r:any) => {
            return await r.json();
        });
    }catch(e){ console.log(e);res.send(JSON.stringify({status:'failed',message:'User Not Verif'}));return; }
    if(response.status === 'success'){
        if(!response.allow){
            console.log(response);
            res.send(JSON.stringify({status:'success',message:'Not Allow'}));return;
        }
    }
    next();
};