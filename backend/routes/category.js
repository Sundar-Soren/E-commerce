const express = require('express')
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const router = express.Router()

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require('../controllers/category')
const { getUserById } = require('../controllers/user')

router.param("userId", getUserById)
router.param("categoryId", getCategoryById)



router.post("/category/create/:userId", isSignIn, isAuthenticated, isAdmin, createCategory)
router.get("/category/:categoryId", getCategory)
router.get("/category", getAllCategory)
router.put("/category/update/:categoryId/:userId", isSignIn, isAuthenticated, isAdmin, updateCategory)
router.delete("/category/delete/:categoryId/:userId", isSignIn, isAuthenticated, isAdmin, removeCategory)


module.exports = router