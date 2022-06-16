import parseCookies from './parseCookies'
import jwt_verif from './jwt_verif'

export default function auth(req:any, res:any, next:any) {
    try{
        let jwt = req.headers.authorization.split(' ')[1];
        let data = jwt_verif(jwt);
        if(data === false){
            //res.writeHead(403, {'Content-Type': 'text/plain'});  
            JSON.stringify({satuts:'error'});
        }
        req.jwt = data;
    }catch(e){ console.log('auth',e);res.end(JSON.stringify({satuts:'error'}));return;}
    next();
};