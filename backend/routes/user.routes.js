const express = require('express');
const auth = require('../controller/auth.controller');
const verifyAuth = require('../utilis/verifyAuth');
const router  = express.Router();

router.post('/register', auth.register);
router.post('/login',auth.login);
router.put('/logout',verifyAuth,auth.logout);
router.get('/auth-check',auth.authV);

module.exports = router;