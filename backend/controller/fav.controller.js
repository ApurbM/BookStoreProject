const Book = require('../Models/books')
const User = require('../Models/user');
const errorHandler = require('../utilis/error');

const insertFavBook = async(req,res,next)=>{
     try{
    const {userid,bookid} = req.headers;
    const getBook = await Book.findById(bookid);
    if(!getBook){
       return next(errorHandler(404,"book dont exist"));
    }
     const user = await User.findById(userid);
      const verify = user.fav.includes(bookid);
         if(verify){
            return next(errorHandler(400,"Allready in favrouit"));
         }
         await User.findByIdAndUpdate(userid,{$push:{fav:bookid}});
          return res.status(202).json({
            success:true,
            message:'Book added to favourites'
          })
     }
  catch(err){
  next(err);
  }
}


const getAllFav = async(req,res,next)=>{
    try{    
    const {userid} = req.headers;
    const user = await User.findById(userid).populate('fav');
    if(!user){
       return next(errorHandler(400,"user not found"));
    }
    return res.status(202).json({
        success:true,
        message:'got all favourite  books',
        favourite:user.fav
    })

    }
    catch(err){
        next(err)
    }
}

const removeBook = async(req,res,next)=>{
     try{  
    const {bookid,userid} = req.headers;
      const user = await User.findById(userid);
    if(!user){
        return next(errorHandler(404,"user not found"));
    }
    const book = await Book.findById(bookid);
    if(!book){
        return next(errorHandler(404,'book not found'));
    }
    await User.findByIdAndUpdate(userid,{
        $pull:{fav:bookid}
    })
    return res.status(202).json({
        success:true,
        message:'favourite book removed'
    })
     }
     catch(err)
     {
        next(err);
     }
} 

module.exports = {
    removeBook,
    getAllFav,
    insertFavBook
}