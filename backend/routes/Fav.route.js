const express = require('express');
const router = express.Router();
const verifyAuth = require('../utilis/verifyAuth');
const {removeBook,
    getAllFav,
    insertFavBook} = require('../controller/fav.controller')

router.put('/insert-fav',verifyAuth,insertFavBook);
router.get('/get-fav',verifyAuth,getAllFav);
router.put('/remove-fav',verifyAuth,removeBook);

module.exports = router;