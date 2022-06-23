import * as crypto from "crypto";

export default function jwt_gen(payload: any): { jwt: string; access_token: string; refresh_token: string; } {
    const fs = require('fs');
    const jwt = require('jsonwebtoken');


    let privateKEY  = fs.readFileSync('tools/private.key', 'utf8');
    let publicKEY  = fs.readFileSync('tools/public.key', 'utf8');

    let i  = 'MARGAUX';   
    let s  = 'GABRIELLE';   
    let a  = 'ALEXIS';
    
    let signOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "2h",
        algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
    };
    
    let date = Date.now();
    payload.access_token = date + ':' + crypto.randomBytes(32).toString('hex');
    payload.refresh_token = date + ':' + crypto.randomBytes(32).toString('hex');

    let token = jwt.sign(payload, privateKEY, signOptions);
    
    let verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "2h",
        algorithm:  ["RS256"]
       };
    try{
        var legit = jwt.verify(token, publicKEY, verifyOptions);
        //log.error("\nJWT verification result: " + JSON.stringify(legit));
    }catch(e){
        throw e;
    }
    
    return {'jwt':token,'access_token':payload.access_token,'refresh_token':payload.refresh_token};
}