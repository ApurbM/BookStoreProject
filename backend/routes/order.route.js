const express = require('express');
const orderController = require('../controller/order.controller');
const verifyAuth = require('../utilis/verifyAuth');
const route = express.Router();

route.get('/getAllOrder',verifyAuth,orderController.getAllOrder);
route.get('/getOrderById',verifyAuth,orderController.getOrderByUser);
route.put('/editStatus',verifyAuth,orderController.editStatus);

module.exports = route;