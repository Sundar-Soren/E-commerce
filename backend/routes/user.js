const express = require('express')
const router = express.Router()

const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require('../controllers/user')
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth')

router.param("userId", getUserById)

router.get("/user/:userId", isSignIn, isAuthenticated, getUser)
router.get("/user/getallusers/:userId", getAllUsers)

router.put('/user/update/:userId', isSignIn, isAuthenticated, updateUser)
router.put('/orders/user/:userId', isSignIn, isAuthenticated, userPurchaseList)

module.exports = router