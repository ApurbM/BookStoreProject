const express = require('express');
const route = express.Router(); 
const commentObj = require('../controller/comment.controller');
const verifyAuth = require('../utilis/verifyAuth');

route.get('/getComment', verifyAuth, commentObj.getAllComments);
route.put('/addComment', verifyAuth, commentObj.addComment);
route.put('/removeComment', verifyAuth, commentObj.removeComment);

module.exports = route; 
