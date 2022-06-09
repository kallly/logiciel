const jwt_verif = require("./jwt_verif");
import express from 'express';
import { User } from "./user/user";

const app = express();
const port = 8092;

app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());
app.listen(port, () => {
    console.log(`Application écoute sur le port ${port}!`);
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
    res.end(JSON.stringify("done"));
}

function default_error(res:any, e:Error){
    console.log(e);
    res.writeHead(400, {'Content-Type': 'text/plain'}); 
    res.end(JSON.stringify("Error")); 
}

app.get('/user', async(req:any, res:any) => {
    let data = ownSecureJwt(req, res);
    if(data === false) return;

    req.url = req.url.concat('/',data.id);

    return app._router.handle(req, res)
});

app.get('/user/:id', async(req:any, res:any, next:any) => {
    const { id } = req.params
    if(! parseInt(id,10)){
        return next();
    }
    User.get_user(id).then((user) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(user)); 
    }).catch((e) => {
        default_error(res,e);
    })
});

app.get('/user/verif', async(req:any, res:any) => { 
    let data = ownSecureJwt(req, res);
    if(data === false) return;

    User.verif_user(parseCookies(req)['jwt']).then((result) => {
        if(result){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify("Allow")); 
        }
        else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify("Not Allow")); 
        }
    }).catch((e) => {
        default_error(res,e);
    })
});

app.put('/user/create', async(req:any, res:any) => {

    let user = new User(null,req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number, req.body.type);
    if(!user.full()){
        res.writeHead(400, {'Content-Type': 'text/plain'});  
        res.end('Missing params\n'); 
        return;
    }

    user.create_user().then(()=>{
        default_done(res); 
    }).catch((e)=>{
        default_error(res,e);
    })
});
app.put('/user/update', async(req:any, res:any) => {

    let data = ownSecureJwt(req, res);
    if(data === false) return;

    let user = new User(data.id,req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number);
    user.update_user().then(()=>{
        default_done(res); 
    }).catch((e)=>{
        default_error(res,e);
    })
});

app.delete('/user', async(req:any, res:any) => {

    let data = ownSecureJwt(req, res);
    if(data === false) return;

    User.delete_user(data.id).then(()=>{
        default_done(res); 
    }).catch((e)=>{
        default_error(res,e);
    })
});