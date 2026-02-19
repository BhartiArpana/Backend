const followModel = require('../models/follow.model')

async function pendingUserController(req,res){
    const username = req.user.username
     
    const isPendingExist = await followModel.findOne({

        followee:username,
       
        status:'pending'
    })
    console.log(isPendingExist)
    if(!isPendingExist){
        return res.status(200).json({
            message:'No follow request exist'
        })
    }

    res.status(200).json({
        message:'all pending reqest fetched',
        isPendingExist
    })
}

async function acceptUserController(req,res){
     const follower = req.params.follower
     const followee = req.user.username

     const request = await followModel.findOne({
        follower:follower,
        followee:followee,
        status:'pending'
     })

     if(!request){
        return res.status(200).json({
            message:'no follow request'
        })
     }

    //  console.log(request);

    request.status = 'accepted'
    await request.save()
   
     
    res.status(200).json({
        message:'request accepted'
    })
}

async function rejectUserController(req,res){
    const follower=req.params.follower
    const followee=req.user.username
    
    const request = await followModel.findOne({
        followee:followee,
        follower:follower,
        status:'pending'
    })

    if(!request){
        res.status(200).json({
            message:'No request found'
        })
    }
    if(request.status === 'pending'){
        await followModel.deleteOne({
            followee:followee,
            follower:follower
        })
    }
    res.status(200).json({
        message:'request rejected successfully!'
    })

}

module.exports = {
    pendingUserController,
    acceptUserController,
    rejectUserController
}