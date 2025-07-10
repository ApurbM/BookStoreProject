const express = require('express');
const router = express.Router();
const verifyAuth = require('../utilis/verifyAuth');
const {
    removeBookFromCart,
    getAllCartBook,
    insertCartBook
} = require('../controller/cart.controller')

router.put('/insert-cart',verifyAuth,insertCartBook);
router.get('/get-cart',verifyAuth,getAllCartBook);
router.put('/remove-cart',removeBookFromCart);

module.exports = router;