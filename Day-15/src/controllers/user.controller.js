const folloModel = require("../models/follow.model")
const authModel = require('../models/auth.model')

async function userFollowController(req,res){
     const followerUserName = req.user.username
     const followeeUserName = req.params.username

    //  console.log(followeeUserName,followerUserName);

    if(followeeUserName===followerUserName){
        return res.status(400).json({
            message:'you can not follow yourself'
        })
    }

    const isFolloweeExist = await authModel.findOne({
        username:followeeUserName
    })
    if(!isFolloweeExist){
        return res.status(409).json({
            message:'User does not exist'
        })
    }

    const isalredyfolloweing = await folloModel.findOne({
        followee:followeeUserName,
        follower:followerUserName
    })
    if(isalredyfolloweing){
        return res.status(200).json({
            message:`you already followed ${followeeUserName}`
        })
    }
     
     const followRecord = await folloModel.create({
        follower:followerUserName,
        followee:followeeUserName
     })

     res.status(201).json({
        message:`you are now following ${followeeUserName}`,
        follow:followRecord
     })
}

async function userUnfollowController(req,res){
    const followerusername=req.user.username
    const followeeusername = req.params.username

    const isFollowed = await folloModel.findOne({
        followee:followeeusername,
        follower:followerusername
    })

    if(!isFollowed){
        return res.status(409).json({
            message:`you did not follow ${followeeusername}`
        })
    }

    await folloModel.findByIdAndDelete(isFollowed._id)
    res.status(200).json({
        message:`Now you unfollow ${followeeusername}`
    })
}

module.exports = {
    userFollowController,
    userUnfollowController
}