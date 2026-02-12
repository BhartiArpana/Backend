const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const crypto=require('crypto')
const cookieParser = require('cookie-parser')
const userModel = require('../models/user.model')

userRouter.post('/register',async(req,res)=>{
    const {name,email,password} = req.body

    const isUserExists =await userModel.findOne({email})
    if(isUserExists){
        return res.status(409).json({
            message:'user alredy created with this email'
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex") 
    const user = await userModel.create({
        name,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    
    res.cookie('JWT_TOKEN',token)
    res.status(201).json({
        message:'user created!',
        user,
        token
    })

})

userRouter.post('/protected',(req,res)=>{
    console.log(req.cookie);
    res.status(200).json({
        message:'cookie'
    })
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"User Not Exists"
        })
    }
    const isPasswordCorrect = user.password===crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordCorrect){
        return res.status(401).json({
            message:'Inavlid Password'
        })
    }

    const token= jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('JWT_TOKEN',token)
    res.status(200).json({
        message:'user loggedin successfully!',
        user
    })
})
module.exports = userRouter