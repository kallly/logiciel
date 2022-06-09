import express from 'express';
import LoginController from './controllers/login';
import UserController from './controllers/user';
import jwt_verif from '../../tools/jwt_verif';

var fs = require('fs');
var https = require('https');

const app = express();
const port = 443;

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

function default_error(res:any, e:Error){
    console.log(e);
    res.writeHead(400, {'Content-Type': 'text/plain'}); 
    res.end("Error"); 
}

const auth = function (req:any, res:any, next:any) {
    let cookies = parseCookies(req);
    try{
        let data = jwt_verif(cookies['jwt'])
        if(data === false){
            res.writeHead(403, {'Content-Type': 'text/plain'});  
            res.end('Not allow\n');
        }
        req.jwt = data;
    }catch(e){ console.log(e);return;}
    next();
  };

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    apis: ['middleware.ts']
};

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.post('/login', (req:any, res:any) => {
    console.log(req.body);
    const controller = new LoginController();
    controller.login(req.body).then((response) => {
        //res.writeHead(200, {'Content-Type': 'application/json','Set-Cookie': [`jwt=${response.message}`]});
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});

app.use('/user',auth);
app.get('/user', (req:any, res:any) => {
    const controller = new UserController();
    controller.getUser(parseCookies(req)['jwt']).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});

app.use('/user/create',auth);
app.put('/user/create', (req:any, res:any) => {
    const controller = new UserController();
    controller.createUser(parseCookies(req)['jwt'],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
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