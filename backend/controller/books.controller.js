const Book = require('../Models/books');

const getAllBook = async (req, res, next) => {
    try {
        const allBook = await Book.find().sort({ createdAt: -1 }); // 🔧 await was missing
        return res.status(200).json({
            success: true,
            message: 'All books fetched',
            bookArray: allBook,
        });
    } catch (err) {
        next(err);
    }
};

const postBook = async (req, res, next) => {
    try {
        const user = req.user;

        // ✅ Must return here to prevent falling through
        if (user.role === 'user') {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to send this request',
            });
        }

        const {
            title,
            description,
            category,
            trending,
            oldPrice,
            newPrice,
        } = req.body;

        const coverImage = req.file ? req.file.filename : null;

        // ✅ Check for required fields
        if (
            !title ||
            !description ||
            !category ||
            !trending ||
            !oldPrice ||
            !newPrice ||
            !coverImage
        ) {
            return res.status(400).json({
                success: false,
                message: 'Enter all required details including cover image',
            });
        }

        const newBook = new Book({
            title,
            description,
            category,
            trending,
            oldPrice,
            newPrice,
            coverImage,
        });

        const savedBook = await newBook.save();

        return res.status(201).json({
            success: true,
            message: 'Book saved',
            book: savedBook,
        });
    } catch (err) {
        next(err);
    }
};

const updateBook = async (req,res,next)=>{
    const {role} = req.user;
    if(role==='user'){
        return res.status(400).json({
            success:false,
            message:"user can't update book"
        })
    }
try{    
    const bookid = req.headers['bookid']; // or use req.params/bookId if passed as param
 const val = req.body;
  const initialBook = await Book.findById(bookid);

  
const updatedBook =   await Book.findByIdAndUpdate(bookid,{
    title:val.title ? val.title:initialBook.title,
    description:val.description?val.description:initialBook.description,
    category:val.category?val.category:initialBook.category,
    trending:val.trending?val.trending:initialBook.trending,
    oldPrice:val.oldPrice?val.oldPrice:initialBook.oldPrice,
    newPrice:val.newPrice?val.newPrice:initialBook.newPrice
  },{
    new:true
  })

return res.status(200).json({
    success:true,
    message:'book updated',
    savedBook:updatedBook
})

}
catch(err){
   next(err);
}
}

const removeBook = async(req,res,next)=>{
         const {role} = req.user;
         if(role==='user'){
            return res.status(400).json({
                success:false,
                message:'you are not a admin'
            })
         }
         try{
       const bookid = req.headers['bookid'];
       const deleted =await  Book.findByIdAndDelete(bookid);
        if(!deleted){
            return res.status(400).json({
                success:false,
                message:'book not found'
            })
        }
       return res.status(202).json({
        success:true,
        message:'book deleted successfully'
       })
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    getAllBook,
    postBook,
    updateBook,
    removeBook
};
