const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const redis = require('../config/cache')

async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:'Token not provided'
        })
    }

    const isTokenBlacklisted = await redis.get(token)
     if(isTokenBlacklisted){
        return res.status(401).json({
            message:'Invalid Token'
        })
     }

    try{
      let decoded = jwt.verify(token,process.env.jWT_SECRET)
      req.user = decoded
      next()
    }catch(err){
        return res.status(401).json({
            message:'Token expired'
        })
    }
    

}
module.exports = {authUser}