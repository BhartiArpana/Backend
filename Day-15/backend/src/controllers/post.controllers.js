const postModel = require('../models/posts.model')
const { ImageKit, toFile } = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')
const { param, post } = require('../Routes/post.routes')
const likeModel = require('../models/like.model')

const imagekit= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res){
    // console.log(req.body,req.file)
    // console.log(decoded)

    const file=await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:'Test',
        folder:'cohort_insta_clone'
    })
    
    const post = await postModel.create({
        caption:req.body.caption,
        postImg:file.url,
        userId:req.user.id
    })
    res.status(201).json({
        message:'post created successfully.',
        post
    })
}

async function getPostController(req,res){

    const userId=req.user.id
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
   
    const userId = req.user.id
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

async function likePostController(req,res){
    const userId=req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(200).json({
            message:'Post not found!'
        })
    }

    const like = await likeModel.create({
        userId:userId,
        postId:postId
    })
    res.status(201).json({
        message:'post like successfully!',
        like
    })
}

async function getFeedController(req,res){
    const user = req.user
    const posts =await Promise.all(( await postModel.find().populate('userId').lean())
    .map(async(post)=>{
        const isLike = await likeModel.findOne({
           userId:user.username,
           postId:post._id
        })

       post.isLike=Boolean(isLike)
       return post
    })
)

    res.status(200).json({
        message:'posts fetched successfully',
        posts
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
}