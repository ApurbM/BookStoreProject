const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.route');
const verifyAuth = require('./utilis/verifyAuth');
const favRoutes = require('./routes/Fav.route');
const cartRoutes = require('./routes/cart.route');
const paymentRoutes = require('./routes/payment.route');
const purchase = require('./Models/purchase');
require('dotenv').config();

// Middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({
  origin: 'https://book-store-project-lake.vercel.app', // your React frontend URL
  // origin:'http://localhost:5173',
}));

// app.use("/uploads", express.static("uploads"));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/fav', verifyAuth, favRoutes);       // ⬅️ Protected
app.use('/api/cart', verifyAuth, cartRoutes);     // ⬅️ Protected
app.use('/api/payment', verifyAuth, paymentRoutes); // ⬅️ Protected
// Database
mongoose.connect(process.env.MONGODB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Test protected route
app.get('/', verifyAuth, (req, res) => {
  res.status(202).json({
    success: true,
    message: "Connected",
  });
});

app.post('/webhook',express.raw({type:'application/json'}),async (req,res)=>{
     const webhookSecret = process.env.RAZORPAY_KEY_SECRET;
     console.log("hi");
     const signature = req.headers['x-razorpay-signature'];
     const generateSignature = crypto.createHmac('sha256',webhookSecret).update(req.body).digest('hex');

     if(signature===generateSignature){
        const data = JSON.parse(req.body);     
       if(data.event === 'payment.captured'){
         console.log('Webhook received at:', new Date());
         console.log('Payload:', req.body);
        
        const payment = data.payload.payment.entity;
         console.log(payment);
         try{
            const newPurchase = new purchase({
                user:payment.notes.userid , 
                 book : payment.notes.bookid,
                 price: payment.amount/100,
                 razorpay_order_id: payment.order_id,
                 razorpay_payment_id:payment.id,
                 paymentMethod: payment.method,
                 status: payment.status,
                 receipt:payment.receipt,
                billingEmail:payment.email,
               billingPhone:payment.contact,
               paidAt: new Date(payment.created_at*1000)
            });
          await newPurchase.save();
          res.status(200).json({success:true,message:'payment recipt saved'});
         }
         catch(err){
           console.error('❌ DB Save Failed:', err);
        res.status(500).json({ status: 'db-error' });
         }
        }
        else{
        res.status(200).json({success:false,message:data.event});
        }
     }
     else {
    res.status(400).send('❌ Invalid signature');
      }
})



// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Network error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("🚀 Server connected!");
});
