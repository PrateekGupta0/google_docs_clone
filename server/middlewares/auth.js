//middleware of get function

const jwt =require('jsonwebtoken');
const auth =async (req,res,next) => {
    try{// done for jwt token is present or not
        const token =req.header("x-auth-token");// sending jwt to server
        if(!token){
            return res.status(401/*user is unauthorise*/).json({msg:'No auth token ,access denied.'});
        }

        const verified =jwt.verify(token,"passwordKey");

        if(!verified){
            return res.status(401).json({msg: 'Token verification failed,try again'})
        }

        req.user = verified.id;//this  is the id of the user which goes to server
        req.token=token;// this is the token to send.
        next();// applying this ensure that now we to move to the server.
    }catch(e){
        res.status(500).json({error :e.message});
    }
}


module.exports = auth;