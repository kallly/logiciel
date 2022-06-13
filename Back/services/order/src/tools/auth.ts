import parseCookies from './parseCookies'
import jwt_verif from './jwt_verif'

export default  function auth(req:any, res:any, next:any) {
    let cookies = parseCookies(req);
    try{
        let data = jwt_verif(cookies['jwt']);
        if(data === false){
            //res.writeHead(403, {'Content-Type': 'text/plain'});  
            res.end('Not allow\n');
        }
        req.jwt = data;
    }catch(e){ console.log(e);res.end('Error');;}
    next();
};