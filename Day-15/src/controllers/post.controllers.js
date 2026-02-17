const postModel = require('../models/posts.model')
const { ImageKit, toFile } = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')
const { param, post } = require('../Routes/post.routes')

const imagekit= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res){
    console.log(req.body,req.file)
    const token = req.cookies.Token
    if(!token){
        return res.status(401).json({
            message:'Token not provided, unauthorize user'
        })
    }
    let decoded=null
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:'user not authorized'
        })
    }
    // console.log(decoded)

    const file=await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:'Test',
        folder:'cohort_insta_clone'
    })
    
    const post = await postModel.create({
        caption:req.body.caption,
        postImg:file.url,
        userId:decoded.id
    })
    res.status(201).json({
        message:'post created successfully.',
        post
    })
}

async function getPostController(req,res){
    const token = req.cookies.Token

    let decoded  = null
    try{
        decoded  = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"token not protected"
        })
    }
    const userId=decoded.id
    console.log(userId);
    
    const posts = await postModel.find({
        userId:userId
    })
    console.log(posts);
    
    res.status(200).json({
        message:'posts fetched seccessfully.',
        posts
    })
}


async function getPostDetailsController(req,res){
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
    const userId = decoded.id
    console.log(userId);
    
    const postId = req.params.postId

    // console.log(postId);
    

    const posts = await postModel.findById(postId)
    if(!posts){
        return res.status(404).json({
    message: "post not found"
})
    }

    const isValidUser = posts.userId.toString() === userId

    if(!isValidUser){
        return res.status(401).json({
            message:'Forbidden content'
        })
    }

    return res.status(200).json({
        message:"post fetched successfully",
        posts
    })

}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}