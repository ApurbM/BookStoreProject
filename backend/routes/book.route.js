const express = require('express');
const router = express.Router();
const verifyAuth = require('../utilis/verifyAuth');
const {postBook} = require('../controller/books.controller');
const {getAllBook} = require('../controller/books.controller');
const {updateBook} = require('../controller/books.controller');
const {removeBook} = require('../controller/books.controller');
const upload = require('../utilis/Multer');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });



router.post('/post-book',verifyAuth,upload.single('coverImage'),postBook);
router.get('/get-all-books',getAllBook);
router.put('/update-book',verifyAuth,updateBook);
router.delete('/remove-book',verifyAuth,removeBook);


module.exports = router;