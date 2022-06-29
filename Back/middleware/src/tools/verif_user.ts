import https from 'https'
const fetch = require('node-fetch');
import { Logger } from 'tslog';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});


export default async function verif_user(req:any, res:any, next:any) {
    const log: Logger = new Logger({ name: "verif_user", requestId:req.headers['x-request-id'] });
    let jwt = req.headers.authorization.split(' ')[1];
    const opts = {
    headers: {
        authorization: `Bearer ${jwt}`
        },
        agent: httpsAgent
    };
    let response;
    try{
        response = await fetch('https://mag-user:8092/user/verif',opts).then(async (r:any) => {
            return await r.json();
        });
    }catch(e){ log.error(e);res.send(JSON.stringify({status:'failed',message:'User Not Verif'}));return; }
    if(response.status === 'success'){
        if(!response.allow){
            log.error(response);
            res.send(JSON.stringify({status:'success',message:'Not Allow'}));return;
        }
        next();
    }
};