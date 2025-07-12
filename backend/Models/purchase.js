const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },

  book:
[ 
  {
    type: mongoose.Types.ObjectId,
    ref: 'books',
  }
],

  price: {
    type: Number,
  },

  razorpay_order_id: {
    type: String,
  },

  razorpay_payment_id: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  status: {
    type: String,
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
    default: 'not_required'
  },

  paidAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model('purchase', purchaseSchema);
