const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

let refreshTokens = []

const authController = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt)
            //CREATE USER
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })
            //SAVE TO DATABASE
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" }

        )
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: "365d" })
    },
    //LOGIN
    loginUser: async (req, res) => {

        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                res.status(404).json("Not found User")
            } else {
                const validPassword = bcrypt.compareSync(req.body.password, user.password)
                if (user && validPassword) {
                    const accessToken = authController.generateAccessToken(user)
                    const refreshToken = authController.generateRefreshToken(user)
                    refreshTokens.push(refreshToken)
                    res.cookie(
                        "refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict",

                    })

                    const { password, ...others } = user._doc
                    res.status(200).json({ ...others, accessToken })
                } else if (!validPassword) {
                    res.status(404).json("Password is wrong!")
                }
            }

        } catch (error) {
            res.status(500).json(error);
        }
    },

    loginWithGoogle: async (req, res) => {
        res.status(200).json('LOGIN WITH GOOGLE')
    },
    loginWithGoogleCallback: async (req, res) => {
        res.status(200).json('LOGIN WITH GOOGLE CALLBACK')
    },
    //STORE TOKEN
    //1 => LOCAL STORAGE DANGEROUS XSS
    //2 => HTTPONLY COKKIES => CSRF SAMESITE
    //3 => REDUX STORE TO STORE ACCESS TOKEN AND HTTPONLY COOKIES => REFRESHTOKEN

    // RESTRICT ATTACK BFF PATTERN (BACKEND FOR FRONTEND)

    requestRefreshToken: async (req, res) => {
        //1 Take the refreshtoken from user
        const refreshToken = req.cookies.refreshToken
        if (!refreshTokens) {
            return res.status(401).json('This token is not valid')
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) return res.status(401).json('You are not authenticated')
            //create new accesstoken, refresh token
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            refreshTokens.push(newRefreshToken)
            res.cookie(
                "refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",

            })
            return res.status(200).json({ accessToken: newAccessToken })
        })

    },
    //LOGOUT
    userLogout: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)
        return res.status(200).json("logout!!")
    }
}

module.exports = authController