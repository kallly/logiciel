import jwt_verif from './jwt_verif'
import { Logger } from "tslog";

export default function auth(req:any, res:any, next:any) {
    const log: Logger = new Logger({ name: "auth", requestId:req.headers['x-request-id'] });
    try{
        let jwt = req.headers.authorization.split(' ')[1];
        let data = jwt_verif(jwt);
        if(data === false){
            log.warn('jwt not valid');
            res.send({satuts:'error'});
            return;
        }
        req.jwt = data;
    }catch(e){ log.warn(e);res.send({satuts:'error'});return;}
    next();
};