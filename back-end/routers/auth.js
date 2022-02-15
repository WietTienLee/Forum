const passport = require('passport');
const authController = require('../controllers/authController')
const { verifyToken } = require("../controllers/verifyToken");
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express()
app.use(cors())
const router = require('express').Router()
require('../controllers/passport-setup')
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieSession({
    name: 'TDTForum-session',
    keys: ['key1', 'key2']
}))
router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', verifyToken, authController.userLogout)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureMessage: 'Cannot login to Google!', failureRedirect: '/login' }),
    function (req, res) {
        //GET SUCCESS GOOGLE ACCOUNT
        res.status(200).json('LOGIN SUCCESS' + req.user)
    })
//REFRESH
router.post("/refresh", authController.requestRefreshToken)
module.exports = router;