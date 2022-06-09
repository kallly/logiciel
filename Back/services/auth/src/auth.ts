import jwt_gen from './jwt_gen';
import auth from './auth_fn';
import { update_jwt } from "./user/update_jwt";

var fs = require('fs');
var https = require('https');

const express = require('express');
const app = express();
const port = 8091;

app.use(express.json());

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
    res.end(JSON.stringify("done"));
}

function default_error(res:any, e:Error){
    console.log(e);
    res.writeHead(400, {'Content-Type': 'application/json'}); 
    res.end(JSON.stringify("Error")); 
}

app.post('/login', (req:any, res:any) => {
    console.log(req.body);
    if(req.body.email == undefined || req.body.password == undefined){
        res.writeHead(400, {'Content-Type': 'application/json'});  
        res.end(JSON.stringify('Missing params')); 
        return;
    }

    auth(req.body.email,req.body.password).then(data => {
        if(!data){
            res.writeHead(200, {'Content-Type': 'application/json'});  
            res.end(JSON.stringify('Failed'));
            return;  
        }
        
        let jwt = jwt_gen(data);

        update_jwt(data.id,jwt).then(() => {
            res.writeHead(200, {'Content-Type': 'application/json'});  
            res.end(JSON.stringify(jwt));
        }).catch((e) => {
            default_error(res,e);
        });   
    });
});

const httpsServer = https.createServer({
    key: fs.readFileSync("../ssl/key.pem"),
    cert: fs.readFileSync("../ssl/cert.pem"),
  },
  app
);
httpsServer.listen(port, () => {
    console.log(`Application écoute sur le port ${port}!`);
});