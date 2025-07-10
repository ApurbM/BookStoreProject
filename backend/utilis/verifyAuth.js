const jwt = require('jsonwebtoken');
const errorHandler = require('./error');

const verifyAuth = async (req,res,next)=>{
     try{
       const token = req.cookies.token;
       if(!token){
        return next(errorHandler(404,"Unauthourzed user"));
       }
       jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
             if(err){
                return next(404,"Error in verification");
             }  
        if(user){
            req.user = user;
            next();
          }
       })

    }     
catch(err){
   next(err);
}
}

module.exports = verifyAuth;