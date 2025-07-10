const express = require('express');
const router = express.Router();
const verifyAuth = require('../utilis/verifyAuth');
const Book = require('../Models/books');
const User = require('../Models/user');
const Order = require('../Models/purchase');
router.post('/place-order',async (req,res,next)=>{
   try{
    const { userid } = req.headers;
    const {order} = req.body;
    for(const orderData of order){
        const neworder = new Order({
          user: userid,
          book:orderData._id        
        })
    const orderDataFromDB = await neworder.save();
     await User.findByIdAndUpdate(userid,{
        $push:{purchase:orderDataFromDB._id}
     })    
     await User.findByIdAndUpdate(userid,{
           $pull:{cart:orderData._id}
     })

    }    
     return res.status(202).json({
        success:true,
        message:'Order handled successfully'
     })

   }
   catch(err){
next(err);
   }
});

module.exports = router;