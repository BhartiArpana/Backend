const jwt = require('jsonwebtoken')


async function identifyUser(req,res,next){
      const token = req.cookies.Token
         if(!token){
             return res.status(401).json({
                 message:'Token not provided'
             })
         }
     
         let decoded = null
         try{
             decoded = jwt.verify(token, process.env.JWT_SECRET)
         }catch(err){
             return res.status(401).json({
                message:'Invalid token '
             })
         }
         req.user = jwt.decode
         next()
}
module.exports = identifyUser