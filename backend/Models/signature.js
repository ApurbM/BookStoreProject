const mongoose = require('mongoose');


const signature = new mongoose.Schema
(
    {   
     userid:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'user',
    },
    Razorpay_order_id:{
        type:String,
    },
    Razorpay_payment_id:{
        type:String,
    },
    Razorpay_signature:{
        type:String,
    }
  }
);


const sign = mongoose.model('singnature',signature);
module.exports = sign;