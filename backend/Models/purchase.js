const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },

  book: {
    type: mongoose.Types.ObjectId,
    ref: 'books',
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  razorpay_order_id: {
    type: String,
    required: true
  },

  razorpay_payment_id: {
    type: String,
    required: true
  },
  
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'emi', 'bank_transfer', 'cash'],
    required: true
  },

  status: {
    type: String,
    enum: ['created', 'attempted', 'paid', 'failed', 'refunded'],
    default: 'paid'
    // ✅ These are Razorpay official states
  },

  receipt: {
    type: String
    // ✅ Use this for matching with Razorpay's `receipt` field
  },

  billingEmail: {
    type: String
  },

  billingPhone: {
    type: String
  },

  deliveryStatus: {
    type: String,
    enum: ['not_required', 'shipped', 'delivered'],
    default: 'not_required'
  },

  paidAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model('purchase', purchaseSchema);
