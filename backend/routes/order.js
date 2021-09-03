const express = require('express')
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus } = require('../controllers/order')
const { updateStock } = require('../controllers/product')
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const router = express.Router()

//param
router.param('userId', getUserById)
router.param('orderId', getOrderById)


router.post('/order/create/:userId', isSignIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)

router.get('/order/all/:userId', isSignIn, isAuthenticated, isAdmin, getAllOrders)



router.get('/order/status/:userId', isSignIn, isAuthenticated, isAdmin, getOrderStatus)
router.put('/order/:orderId/status/:userId', isSignIn, isAuthenticated, isAdmin, updateStatus)


module.exports = router