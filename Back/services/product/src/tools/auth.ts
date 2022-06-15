import parseCookies from './parseCookies'
import jwt_verif from './jwt_verif'

export default  function auth(req:any, res:any, next:any) {
    let cookies = parseCookies(req);
    try{
        let data = jwt_verif(cookies['jwt']);
        if(data === false){
            res.send(JSON.stringify({status:'error',message:'jwt empty'}));
            return;
        }
        req.jwt = data;
    }catch(e){ console.log(e);res.send(JSON.stringify({status:'error',message:'jwt error'}));return;}
    next();
};