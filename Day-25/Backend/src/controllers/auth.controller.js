const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const balcklistModel = require('../models/blacklist.model') 
const blacklistModel = require('../models/blacklist.model')
const redis = require('../config/cache')


async function registerUser(req,res){
   const {username,email,password}= req.body

   const isAlreadyUserExist = await userModel.findOne({
      $or:[
        {username},
        {email}
      ]
   })

   if(isAlreadyUserExist){
    return res.status(409).json({
       message:'User already exists.'
    })
   }

   const hash = await bcrypt.hash(password,10)

   const user = await userModel.create({
    username,
    email,
    password:hash
   })

   const token = jwt.sign({
    id:user._id,
    username:user.username
   },process.env.JWT_SECRET,{
    expiresIn:'1d'
   })

   res.cookie('token',token)
   res.status(201).json({
    message:'User registerd seccessfully!',
    user,
    token
   })
}

async function LoginUser(req,res){
    const {username,email,password} = req.body
     
    const user = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message:'Invalid Credential'
        })
    }

    const isPasswordCorrect =await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({
            message:'Inavlid Credential'
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET)

    res.cookie('token',token)
    res.status(200).json({
        message:'User loggedIn successfully!',
        user
    })

}

async function getMe(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:'user Fetched successfully!',
        user
    })
}

async function logout(req,res){
      const token= req.cookies.token
      res.clearCookie("token")

      await redis.set(token,new Date().toString(),'EX',60*60)

      res.status(200).json({
        message:'user Logout successfully!'
      })
}

module.exports = {
    registerUser,
    LoginUser,
    getMe,
    logout
}
