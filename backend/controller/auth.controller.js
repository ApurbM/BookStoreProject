const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utilis/error');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req,res,next)=>{
     const {username,email,address,password} = req.body;   
     try{  
     const found =  await User.find({email:email});
       if(found.length!==0){
          return next(errorHandler(404,"user already logged in!"));
       }
   
        const newPassword = await bcrypt.hash(password,10);    
         const user = new User({
            username:username,
            email:email,
            address:address,
            password:newPassword,
         });
         const saveduser = await user.save();
         if(!saveduser){
            return next(errorHandler(505,"user failed to save"));
         }
         return res.status(202).json({
            success:true,
            message:"User registered successfully"
         })          
    }
   catch(err){
    next(err);
   } 
}

const login =async (req,res,next)=>{
      try{
         const {email,password} = req.body;
          if(!email || !password) {
            return next(errorHandler(404,"Enter details carefully"));
          }

         const findUser = await User.findOne({email:email});
         if(!findUser){
             return res.status(404).json({
               success:false,
               message:'User not register'
             })
         }
         const matched = await bcrypt.compare(password,findUser.password);
         if(!matched){
            return res.status(404).json({
               success:false,
               message:'Password not matched'
            })
         }
         const token =  jwt.sign({id:findUser._id,role:findUser.role},process.env.JWT_KEY);
         
         const {password:hashedPassword , ...rest} = findUser._doc;
          return res.cookie('token',token,{
            httpOnly:true,
            secure:true
          }).json({
            success:true,
            rest:rest,
            message:'User logged in successfully'
          })      
      }         
      catch(err){
         return next(err);
      }
}

const logout =  (req,res,next)=>{
    res.clearCookie('token').json({
      success:true,
      message:'Logged out successfully'
    })    

}

module.exports = {
    register,
    login,
    logout
}
