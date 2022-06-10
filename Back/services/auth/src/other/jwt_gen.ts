function jwt_gen(payload: {}) {
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
        expiresIn:  "12h",
        algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
    };
    
    let token = jwt.sign(payload, privateKEY, signOptions);
    
    let verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "12h",
        algorithm:  ["RS256"]
       };
    try{
        var legit = jwt.verify(token, publicKEY, verifyOptions);
        //console.log("\nJWT verification result: " + JSON.stringify(legit));
    }catch(error){
        console.log(error);
        return false;
    }
    
    return token;
}

export default jwt_gen;