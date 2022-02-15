const passport = require('passport')
const User = require('../models/User')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()
passport.serializeUser((user, done) => {
    console.log('serializing user', user);

    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id } }).catch((err) => {
        console.log('ERR deserializing', err)
        done(err, null)
    })
    console.log('dezializing user', user)
    if (user)
        done(null, user)
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/v1/auth/google/callback',
}, async function (accessToken, refreshToken, profile, done) {
    const defaultUser = {
        username: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id
    }
    const user = await User.findOne({
        googleId: profile.id
    }).catch((err) => {
        console.log('error signing up', err)
        return done(err, null)
    })
    if (user) {
        console.log('Da co tai khoan')
        return done(null, user)
    }
    else if (!user) {
        console.log('CHUA CO TAI KHOAN')
        newUser = new User({
            username: defaultUser.username,
            email: defaultUser.email,
            picture: defaultUser.picture,
            googleId: defaultUser.googleId
        })
        await newUser.save()
        return done(null, newUser)
    }

}
))