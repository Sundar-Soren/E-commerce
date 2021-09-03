const express = require('express')
const { signup, signin, signout, isSignIn } = require('../controllers/auth')
const router = express.Router()
const { check } = require('express-validator');


router.post('/signup',

    [check('name').isLength({ min: 3 }).withMessage(' NAME must be at least 3 chars long'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 4 }).withMessage('passowrd must be 4 character')
    ]
    , signup)


router.post('/signin', signin)

router.get('/signout', signout)
router.get('/test', isSignIn, (req, res) => {
    res.json(req.auth)
})



module.exports = router