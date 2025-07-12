const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const Sign = require('../Models/signature'); 
                                              
// verifyAuth is already applied globally via app.use()

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  CREATE ORDER
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount,
    currency: 'INR',
    receipt: 'receipt_' + Date.now(),
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// 🟢 VERIFY ORDER
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest('hex');

  if (expectedSign === razorpay_signature) {
    try {
      const order = new Sign({
        Razorpay_order_id: razorpay_order_id,
        Razorpay_payment_id: razorpay_payment_id,
        Razorpay_signature: razorpay_signature,
        userid: req.user.id, // verifyAuth ensures req.user exists
      });

      await order.save();

      return res.status(202).json({
        success: true,
        message: 'Order signature saved',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'DB save failed',
        error: err.message,
      });
    }
  } else {
    return res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});

module.exports = router;
