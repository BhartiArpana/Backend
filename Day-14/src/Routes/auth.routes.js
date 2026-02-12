const express = require('express')
const authRoutes=express.Router()
const userModel = require('../models/user.model')
const jwt =require('jsonwebtoken')
const cookieParser = require('cookie-parser')

authRoutes.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    const isEmailExist = await userModel.findOne({email})
    if(isEmailExist){
        return res.status(409).json({
            message:'User already exist.'
        })
    }
    
    const user = await userModel.create({
        name,email,password
    })
    const token  = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET)
    
    res.cookie('Token',token)
    
    res.status(201).json({
        message:'User Created successfully.',
        user,token
    })
})

module.exports = authRoutes