const Book = require('../Models/books')
const User = require('../Models/user');
const errorHandler = require('../utilis/error');

const insertCartBook = async(req,res,next)=>{
     try{
    const {userid,bookid} = req.headers;
    if(!userid || !bookid){
        return res.status(404).json({
            success:false,
            message:'Enter all details'
        })
    }
    const getBook = await Book.findById(bookid);
    if(!getBook){
       return next(errorHandler(404,"book dont exist"));
    }
     const user = await User.findById(userid);
      const verify = user.cart.includes(bookid);
         if(verify){
            return next(errorHandler(400,"Allready in cart"));
         }
         await User.findByIdAndUpdate(userid,{$push:{cart:bookid}});
          return res.status(202).json({
            success:true,
            message:'Book added to cart'
          })
     }
  catch(err){
  next(err);
  }
}


const getAllCartBook = async(req,res,next)=>{
    try{    
    const {userid} = req.headers;
    if(!userid){
        return res.status(404).json({
            success:false,
            message:'Enter all details'
        })
    }

    const user = await User.findById(userid).populate('cart');
    if(!user){
       return next(errorHandler(400,"user not found"));
    }
    return res.status(202).json({
        success:true,
        message:'got all cart books',
        favourite:user.cart
    })

    }
    catch(err){
        next(err)
    }
}

const removeBookFromCart = async(req,res,next)=>{
     try{  
    const {bookid,userid} = req.headers;
    if(!userid || !bookid){
        return res.status(404).json({
            success:false,
            message:'Enter all details'
        })
    }
    const user = await User.findById(userid);
    if(!user){
        return next(errorHandler(404,"user not found"));
    }
    const book = await Book.findById(bookid);
    if(!book){
        return next(errorHandler(404,'book not found'));
    }
    await User.findByIdAndUpdate(userid,{
        $pull:{cart:bookid}
    })
    return res.status(202).json({
        success:true,
        message:'cart book removed'
    })
     }
     catch(err)
     {
        next(err);
     }
} 

module.exports = {
    removeBookFromCart,
    getAllCartBook,
    insertCartBook
}