const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.route');
const verifyAuth = require('./utilis/verifyAuth');
const favRoutes = require('./routes/Fav.route');
const cartRoutes = require('./routes/cart.route');
const paymentRoutes = require('./routes/payment.route');
const purchase = require('./Models/purchase');
const { Types } = require('mongoose');

dotenv.config();

// Middleware (except for /webhook)
app.set("trust proxy", 1);
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // skip express.json for webhook
  } else {
    express.json()(req, res, next);
  }
});
app.use(cors({
  origin: 'https://book-store-project-lake.vercel.app', // Or localhost during development
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/fav', verifyAuth, favRoutes);
app.use('/api/cart', verifyAuth, cartRoutes);
app.use('/api/payment', verifyAuth, paymentRoutes);

// Test route
app.get('/', verifyAuth, (req, res) => {
  res.status(202).json({
    success: true,
    message: "Connected",
  });
});

// ✅ Razorpay Webhook Route
app.post('/webhook', express.json(), async (req, res) => {
  const data = req.body;

  console.log("✅ Webhook received at:", new Date());
  console.log("📦 Payload:", JSON.stringify(data, null, 2));

  // Signature verification is NOT needed when testing from Postman or Razorpay dashboard
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const generatedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (signature !== generatedSignature) {
    console.log('invalid signature');
    return res.status(400).send('❌ Invalid signature');
  }

  if (data.event === 'payment.captured') {
    const payment = data.payload.payment.entity;

    try {
      const newPurchase = new purchase({
        user: payment.notes.userid,
        book: payment.notes.bookid.split(',').map(id => new mongoose.Types.ObjectId(id))
, // Should be array of valid MongoDB ObjectIds
        price: payment.amount / 100,
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        paymentMethod: payment.method,
        status: payment.status,
        billingEmail: payment.email,
        billingPhone: payment.contact,
        paidAt: new Date(payment.created_at * 1000)
      });

      await newPurchase.save();

      return res.status(200).json({
        success: true,
        message: '✅ Test webhook handled and purchase saved.'
      });
    } catch (err) {
      console.error('❌ DB Save Failed:', err);
      return res.status(500).json({ success: false, message: '❌ Database error' });
    }
  }

  return res.status(200).json({
    success: false,
    message: `ℹ️ Event '${data.event}' not handled`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
