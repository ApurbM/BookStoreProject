const express = require('express');
const Stripe = require('stripe');
const path = require('path');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_KEY_TWO);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Sample Book' },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:4242/success.html',
      cancel_url: 'http://localhost:4242/fail.html',
    });

    res.redirect(303, session.url);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(4242, () => {
  console.log('Server running on http://localhost:4242');
});
