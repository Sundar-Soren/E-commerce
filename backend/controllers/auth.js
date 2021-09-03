const User = require('../models/user')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Fail to Create account"

            })
        }
    })
    res.json(user)
}

exports.signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email does not exist"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Password not Match"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        res.cookie("token", token, { expire: new Date() + 9999 })

        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })

}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: "User signout successfully"
    })
}

exports.isSignIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})

exports.isAuthenticated = (req, res, next) => {

    const checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker) {
        return res.status(403).json({
            Error: "Access Denied"
        })
    }

    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not Admin"
        })
    }
    next()
}