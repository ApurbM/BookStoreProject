const purchase = require('../Models/purchase');
const User = require('../Models/user');
const getAllOrder = async (req,res,next)=>{
         const role = req.user?.role;
         if(role=='user'){
            return res.status(202).json({
                success:false,
                message:'User is not admin'
            })
         }       
     try{
        const orderArray = await purchase.find().sort({ createdAt:-1 });
         return res.status(200).json({
            success:true,
            message:'Got Order',
            orderArray,
         })
       }
       catch(err){
            next(err);
       }
}

const getOrderByUser = async(req,res,next)=>{
      
    const userid  = req.headers.userid;
    if(!userid){
       return res.status(400).json({
        success:false,
        message:'user id is not provided'
       });
    }
    try{
         const isUserPresent = await User.findById(userid);
         if(!isUserPresent){
            return res.status(400).json({
                success:false,
                message:"user is not registered"
            })
         }
        
       const orderArray = await purchase.find({user:userid}).sort({createdAt:-1});       
       return res.status(202).json({
        success:true,
        message:'Order list of user',
        orderArray,
       })

      } 
      catch(err){
            next(err);
      }
}


const editStatus = async(req,res,next)=>{
    if(req.user?.role === 'user'){
        return res.status(200).json({
            success:false,
            message:'Admin can only do status change'
        })
    }
    try{
          const orderid = req.headers.orderid;
          const {newStatus} = req.body;
             if(!orderid){
                return res.status(400).json({
                    success:false,
                    message:'No orderid present',
                })
             }
          
    const updatedOrder =  await purchase.findByIdAndUpdate(orderid,{
                  deliveryStatus:newStatus 
               },{
                new:true,
                // runValidators:true
               }) 
               
               if (!updatedOrder) {
  return res.status(404).json({
    success: false,
    message: "Order not found"
  });
}
         res.status(200).json({
            success:true,
            message:' Status Updated Successfully'
         })        
         }
         catch(err){
            next(err);
         }
}

module.exports = {
    getAllOrder,
    getOrderByUser,
    editStatus
}
