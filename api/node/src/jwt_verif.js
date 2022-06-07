exports.jwt_verif = (token) => {
    const fs = require('fs');
    const jwt = require('jsonwebtoken');

    let publicKEY  = fs.readFileSync('./public.key', 'utf8');

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
        //console.log("\nJWT verification result: " + JSON.stringify(legit));
        return legit;
    }catch(error){
        console.log(error);
        return false;
    }
    
}