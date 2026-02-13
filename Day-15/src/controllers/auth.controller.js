const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req,res){
    const {email,username,password,bio,profileImage}=req.body
    const isUserAlredyExits = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlredyExits){
        return res.status(409).json({
            message:'User already exist'+(isUserAlredyExits===email?" with this email":" with this username")

        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })
   const token = jwt.sign({
    id:user._id
   },process.env.JWT_SECRET,{expiresIn:'1d'})

   res.cookie('Token',token)
   res.status(201).json({
    email:user.email,
    username:user.username,
    bio:user.bio,
    profileImage:user.profileImage
   })

}

async function loginControllers(req,res){
    const {email,username,password}=req.body

    const user = await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })
    if(!user){
        return res.status(409).json({
            message:"User not found "
        })
    }
      hash = await bcrypt.compare(password,user.password)

    const isPassword = hash===user.password
    if(!isPassword){
        return res.status(409).json({
            message:"Inavlid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('Token',token)
    res.status(200).json({
        message:"user loggedIn"
    })

}

module.exports = {
    loginControllers,
    registerController
}