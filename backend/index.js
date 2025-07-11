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
require('dotenv').config();

// Middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend URL
}));

app.use("/uploads", express.static("uploads"));

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
