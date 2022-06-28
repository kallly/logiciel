function jwt_verif(token:string): any {
    const fs = require('fs');
    const jwt = require('jsonwebtoken');

    let publicKEY  = fs.readFileSync('tools/public.key', 'utf8');

    let i  = 'MARGAUX';   
    let s  = 'GABRIELLE';   
    let a  = 'ALEXIS';
    
    let verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "12h",
        algorithm:  ["RS256"]
       };
    try{
        let legit = jwt.verify(token, publicKEY, verifyOptions);
        return legit;
    }catch(e){
        throw e;
    }
}


export default jwt_verif;