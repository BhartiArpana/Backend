const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const cookieParser = require('cookie-parser')
authRouter.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    const isUserExists = await userModel.findOne({email})
    if(isUserExists){
        return res.status(400).json({
            message:'User alredy exists'
        })
    }
    const user = await userModel.create({
        name,email,password
    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('jwt_token',token)

    res.status(201).json({
        message:'user registered',
        user,
        token
    })
})
module.exports = authRouter