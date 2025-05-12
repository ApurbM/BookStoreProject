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
  quantity: {
    type: Number,
    default: 1
  },
  paymentId: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'paid'
  },
  receipt: {
    type: String
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
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('purchase', purchaseSchema);
