import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import morgan from 'morgan'
import {Strategy as GoogleStrategy } from 'passport-google-oauth20'

const app = express()
app.use(morgan('dev'))
dotenv.config()

app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},(_, __,profile,done)=>{
    return done(null,profile)
}))

app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
app.get('/auth/google/callback',
    passport.authenticate('google',{
        session:false,
        failureRedirect:'/login'
    }),

    (req,res)=>{
        console.log(req.user)
        res.send('Google authenticate successful')
    })

app.listen(3000,()=>{
    console.log('server running in port 3000')
})