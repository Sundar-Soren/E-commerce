const express = require('express')
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require('../controllers/product')
const { getUserById } = require('../controllers/user')
const router = express.Router()


router.param("userId", getUserById)
router.param("productId", getProductById)



router.post('/product/create/:userId', isSignIn, isAuthenticated, isAdmin, createProduct)
router.get('/product/:productId', getProduct)
router.get('/product/photo/:productId', photo)
router.delete('/product/:productId/:userId', isSignIn, isAuthenticated, isAdmin, deleteProduct)
router.put('/product/update/:productId/:userId', isSignIn, isAuthenticated, isAdmin, updateProduct)


router.get('/products', getAllProducts)

router.get('/product/category/', getAllUniqueCategories)

module.exports = router