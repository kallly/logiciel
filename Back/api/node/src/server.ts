const http = require("http");  
import jwt_gen from './jwt_gen';
const jwt_verif = require("./jwt_verif");
import auth from './auth';
import { User } from "./user/user";

const express = require('express');
const app = express();
const port = 8090;
app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());
app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
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

function default_done(res:any){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end("done");
}

function default_error(res:any, e:Error){
    console.log(e);
    res.writeHead(400, {'Content-Type': 'text/plain'}); 
    res.end("Error"); 
}

app.post('/login', (req:any, res:any) => {

    if(req.body.email == undefined || req.body.password == undefined){
        res.writeHead(400, {'Content-Type': 'text/plain'});  
        res.end('Missing params\n'); 
        return;
    }

    auth(req.body.email,req.body.password).then(data => {
        if(!data){
            res.writeHead(200, {'Content-Type': 'text/plain'});  
            res.end('Failed\n');
            return;  
        }
        console.log(data);
        let jwt = jwt_gen(data);

        User.update_jwt(data.id,jwt).then(() => {
            res.setHeader('Set-Cookie', [`jwt=${jwt}`])
            res.writeHead(200, {'Content-Type': 'text/plain'});  
            res.end('Auth\n');
        }).catch((e) => {
            default_error(res,e);
        })        
    }) 
});

http.createServer(function (req: any, res: any) {

    let cookies = parseCookies(req);
    if(jwt_verif.jwt_verif(cookies['jwt']) !== false){
        res.writeHead(200, {'Content-Type': 'text/plain'});  
        res.end('Data printer\n');  
    }
    else{
        res.writeHead(403, {'Content-Type': 'text/plain'});  
        res.end('Not allow\n');  
    }

  
}).listen(8091, 
    ()=>console.log('Server running at http://127.0.0.1:8091/'));