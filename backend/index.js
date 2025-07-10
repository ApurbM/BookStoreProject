const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.route');
const verifyAuth = require('./utilis/verifyAuth');
const favRuth = require('./routes/Fav.route'); 
const cartRuth = require('./routes/cart.route');
const paymentRoutes = require('./routes/payment.route');

require('dotenv').config();

app.set("trust proxy",1);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://book-store-project-lake.vercel.app/', // your React frontend URL
    credentials: true, // if you are using cookies or sessions
  }));

app.use("/uploads", express.static("uploads"));
app.use('/api/user',userRoutes);
app.use('/api/book',bookRoutes);
app.use('/api/fav',favRuth);
app.use('/api/cart',cartRuth);
app.use('/api/payment', paymentRoutes);

mongoose.connect(process.env.MONGODB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // ⏱️ 10 seconds timeout
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});



app.get('/',verifyAuth,(req,res)=>{
   res.status(202).json({
    success:true,
    message:"Connected"
   });
})
app.listen(process.env.PORT,()=>{
    console.log("server connected!");
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Network error";

    return res.status(statusCode).json({
        success:false,
        message,  
    })
})
