import parseCookies from './parseCookies'
import jwt_verif from './jwt_verif'
import { default_error } from '../tools/IResponse';

export default  function auth(req:any, res:any, next:any) {
    let cookies = parseCookies(req);
    try{
        let data = jwt_verif(cookies['jwt']);
        if(data === false){
            res.end('Not allow\n');
        }
        req.jwt = data;
    }catch(e:any){ default_error(res,e);return;}
    next();
};