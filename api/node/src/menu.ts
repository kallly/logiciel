const jwt_verif = require("./jwt_verif");
import http_verif_user from './http_verif_user';
import { mongoConnect } from './db/mongo';
import { get_menu } from './menu/get_menu';
import { create_menu } from './menu/create_menu';
const express = require('express');

const app = express();
const port = 8093;

app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());
app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`);
  });

function parseCookies (request: any): any {
    const list: any = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie: string) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}

function ownSecureJwt(req: any, res:any): any{
    let cookies = parseCookies(req);
    let data = jwt_verif.jwt_verif(cookies['jwt'])
    if(data === false){
        res.writeHead(403, {'Content-Type': 'text/plain'});  
        res.end('Not allow\n');
    }
    return data;
}

function default_done(res:any){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end("done");
}

function default_error(res:any, e:Error){
    console.log(e);
    res.writeHead(400, {'Content-Type': 'text/plain'}); 
    res.end("Error"); 
}


app.put('/menu', async(req:any, res:any) => {
    let data = ownSecureJwt(req, res);
    if(data === false) return;

    await http_verif_user(parseCookies(req)['jwt']).then(async (allowed) => {
        if(!allowed){
            res.writeHead(403, {'Content-Type': 'application/json'});
            res.end('Not Allow');
            return;
        }
    
        await create_menu().then(async() => {
            default_done(res);
        }).catch((e) => {throw e;})
        
    }).catch((e) => {
        default_error(res,e);
    });

});

app.get('/menu', async(req:any, res:any) => {
    let data = ownSecureJwt(req, res);
    if(data === false) return;

    await http_verif_user(parseCookies(req)['jwt']).then(async (allowed) => {
        if(!allowed){
            res.writeHead(403, {'Content-Type': 'application/json'});
            res.end('Not Allow');
            return;
        }
    
        await mongoConnect().then(async() => {
            await get_menu().then((result) => {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(result));
            }).catch((e) => {throw e;})
        }).catch((e) => {throw e;})
    }).catch((e) => {
        default_error(res,e);
    })
    
    
});